const user = require("../models/user.model");
const otpModel = require("../models/otp.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const mailService = require("./mail.service");


// ========================================
// JWT CONFIG
// ========================================

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
};


// ========================================
// GENERATE 6 DIGIT OTP
// ========================================

const generateOTP = () => {

    return crypto
        .randomInt(100000, 1000000)
        .toString();
};


// ========================================
// ADMIN CREATE TEACHER / STUDENT
// ========================================
// POST /api/auth/admin/create-user
// ========================================

const createUserByAdmin = async (body) => {

    // Only teacher and student
    const allowedRoles = [
        "teacher",
        "student"
    ];


    // Check role
    if (!allowedRoles.includes(body.role)) {

        throw new Error(
            "Admin can only create Teacher or Student"
        );
    }


    // Check required fields
    if (!body.name) {

        throw new Error(
            "Name is required"
        );
    }


    if (!body.email) {

        throw new Error(
            "Email is required"
        );
    }


    // Check duplicate email
    const existingUser =
        await user.findByEmail(body.email);


    if (existingUser) {

        throw new Error(
            "Email already exists"
        );
    }


    // ========================================
    // CREATE USER
    // ========================================

    const userId =
        await user.create({

            name: body.name,

            email: body.email,

            role: body.role,

            status: "active",

            is_verified: 0
        });


    // ========================================
    // GENERATE OTP
    // ========================================

    const otpCode =
        generateOTP();


    // OTP expires after 5 minutes
    const expiresAt =
        new Date(
            Date.now() + 5 * 60 * 1000
        );


    // ========================================
    // DELETE OLD OTP
    // ========================================

    await otpModel.deleteOldOtp(
        userId,
        "email_verify"
    );


    // ========================================
    // SAVE OTP
    // ========================================

    await otpModel.createOtp(
        userId,
        otpCode,
        "email_verify",
        expiresAt
    );


    // ========================================
    // SEND OTP TO USER EMAIL
    // ========================================

    await mailService.sendOTPEmail(
        body.email,
        otpCode
    );


    // ========================================
    // RETURN USER
    // ========================================

    return await user.findById(userId);
};


// ========================================
// VERIFY EMAIL / OTP
// ========================================
// POST /api/auth/verify-email
// ========================================

const verifyEmail = async (
    email,
    otpCode
) => {

    // Check input
    if (!email || !otpCode) {

        throw new Error(
            "Email and OTP are required"
        );
    }


    // Find user
    const userInfo =
        await user.findByEmail(email);


    if (!userInfo) {

        throw new Error(
            "Email not found"
        );
    }


    // Already verified?
    if (userInfo.is_verified) {

        throw new Error(
            "Account already verified"
        );
    }


    // ========================================
    // FIND VALID OTP
    // ========================================

    const otpInfo =
        await otpModel.findValidOtp(
            userInfo.id,
            otpCode,
            "email_verify"
        );


    if (!otpInfo) {

        throw new Error(
            "Invalid or expired OTP"
        );
    }


    // ========================================
    // VERIFY USER
    // ========================================

    await user.verifyEmail(
        userInfo.id
    );


    // ========================================
    // MARK OTP AS USED
    // ========================================

    await otpModel.markOtpUsed(
        otpInfo.id
    );


    // ========================================
    // GENERATE SETUP TOKEN
    // ========================================

    const setupToken =
        jwt.sign(

            {
                id: userInfo.id,

                purpose: "set_password"
            },

            jwtConfig.secret,

            {
                expiresIn: "15m"
            }
        );


    return {

        message:
            "Account verified successfully",

        setupToken
    };
};


// ========================================
// RESEND OTP
// ========================================
// POST /api/auth/resend-otp
// ========================================

const resendVerifyOTP = async (
    email
) => {

    // Check email
    if (!email) {

        throw new Error(
            "Email is required"
        );
    }


    // Find user
    const userInfo =
        await user.findByEmail(email);


    if (!userInfo) {

        throw new Error(
            "Email not found"
        );
    }


    // Already verified?
    if (userInfo.is_verified) {

        throw new Error(
            "Account already verified"
        );
    }


    // ========================================
    // DELETE OLD OTP
    // ========================================

    await otpModel.deleteOldOtp(
        userInfo.id,
        "email_verify"
    );


    // ========================================
    // GENERATE NEW OTP
    // ========================================

    const otpCode =
        generateOTP();


    // New OTP expires after 5 minutes
    const expiresAt =
        new Date(
            Date.now() + 5 * 60 * 1000
        );


    // ========================================
    // SAVE NEW OTP
    // ========================================

    await otpModel.createOtp(

        userInfo.id,

        otpCode,

        "email_verify",

        expiresAt
    );


    // ========================================
    // SEND NEW OTP
    // ========================================

    await mailService.sendOTPEmail(

        email,

        otpCode
    );


    return {

        message:
            "OTP sent successfully"
    };
};


// ========================================
// SET PASSWORD
// ========================================
// POST /api/auth/set-password
// ========================================

const setPassword = async (
    setupToken,
    newPassword
) => {

    // Check input
    if (!setupToken || !newPassword) {

        throw new Error(
            "Setup token and password are required"
        );
    }


    // ========================================
    // VERIFY SETUP TOKEN
    // ========================================

    let decoded;

    try {

        decoded =
            jwt.verify(
                setupToken,
                jwtConfig.secret
            );

    } catch (error) {

        throw new Error(
            "Invalid or expired setup token"
        );
    }


    // ========================================
    // CHECK TOKEN PURPOSE
    // ========================================

    if (
        decoded.purpose !==
        "set_password"
    ) {

        throw new Error(
            "Invalid setup token"
        );
    }


    // ========================================
    // FIND USER
    // ========================================

    const userInfo =
        await user.findById(
            decoded.id
        );


    if (!userInfo) {

        throw new Error(
            "User not found"
        );
    }


    // ========================================
    // CHECK VERIFIED
    // ========================================

    if (!userInfo.is_verified) {

        throw new Error(
            "Please verify OTP first"
        );
    }


    // ========================================
    // CHECK PASSWORD
    // ========================================

    if (newPassword.length < 6) {

        throw new Error(
            "Password must be at least 6 characters"
        );
    }


    // ========================================
    // HASH PASSWORD
    // ========================================

    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );


    // ========================================
    // UPDATE PASSWORD
    // ========================================

    await user.updatePassword(
        userInfo.id,
        hashedPassword
    );


    return {

        message:
            "Password created successfully"
    };
};


// ========================================
// LOGIN
// ========================================
// POST /api/auth/login
// ========================================

const login = async (body) => {

    // Check email/password
    if (!body.email || !body.password) {

        throw new Error(
            "Email and password are required"
        );
    }


    // ========================================
    // FIND USER
    // ========================================

    const userInfo =
        await user.findByEmail(
            body.email
        );


    if (!userInfo) {

        throw new Error(
            "Email or password is invalid"
        );
    }


    // ========================================
    // CHECK STATUS
    // ========================================

    if (
        userInfo.status !==
        "active"
    ) {

        throw new Error(
            "Your account is inactive"
        );
    }


    // ========================================
    // CHECK VERIFIED
    // ========================================

    if (!userInfo.is_verified) {

        throw new Error(
            "Please verify your account first"
        );
    }


    // ========================================
    // CHECK PASSWORD EXISTS
    // ========================================

    if (!userInfo.password) {

        throw new Error(
            "Please set your password first"
        );
    }


    // ========================================
    // CHECK PASSWORD
    // ========================================

    const isMatch =
        await bcrypt.compare(
            body.password,
            userInfo.password
        );


    if (!isMatch) {

        throw new Error(
            "Email or password is invalid"
        );
    }


    // ========================================
    // GENERATE JWT
    // ========================================

    const token =
        jwt.sign(

            {
                id: userInfo.id,

                email: userInfo.email,

                role: userInfo.role
            },

            jwtConfig.secret,

            {
                expiresIn:
                    jwtConfig.expiresIn
            }
        );


    // ========================================
    // SAVE TOKEN
    // ========================================

    await user.addToken(
        token,
        userInfo.id
    );


    // ========================================
    // RETURN LOGIN DATA
    // ========================================

    return {

        user: {

            id: userInfo.id,

            name: userInfo.name,

            email: userInfo.email,

            role: userInfo.role
        },

        token
    };
};


// ========================================
// GET ME
// ========================================
// GET /api/auth/me
// ========================================

const getMe = async (
    id
) => {

    const userInfo =
        await user.findById(id);


    if (!userInfo) {

        throw new Error(
            "User not found"
        );
    }


    return userInfo;
};


// ========================================
// LOGOUT
// ========================================
// POST /api/auth/logout
// ========================================

const logout = async (
    id
) => {

    // Remove JWT from database
    await user.deleteToken(id);


    return {

        message:
            "Logout successful"
    };
};


// ========================================
// EXPORT
// ========================================

module.exports = {

    createUserByAdmin,

    verifyEmail,

    resendVerifyOTP,

    setPassword,

    login,

    getMe,

    logout
};