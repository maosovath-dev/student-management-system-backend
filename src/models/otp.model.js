const pool = require("../config/db");


// Create OTP
const createOtp = async (
    userId,
    otpCode,
    purpose,
    expiresAt
) => {
    const [result] = await pool.query(
        `INSERT INTO otp_codes
        (
            user_id,
            otp_code,
            purpose,
            expires_at
        )
        VALUES (?, ?, ?, ?)`,
        [
            userId,
            otpCode,
            purpose,
            expiresAt
        ]
    );

    return result.insertId;
};


// Find valid OTP
const findValidOtp = async (
    userId,
    otpCode,
    purpose
) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM otp_codes
         WHERE user_id = ?
         AND otp_code = ?
         AND purpose = ?
         AND is_used = 0
         AND expires_at > NOW()
         ORDER BY id DESC
         LIMIT 1`,
        [
            userId,
            otpCode,
            purpose
        ]
    );

    return rows[0];
};


// Mark OTP as used
const markOtpUsed = async (id) => {
    await pool.query(
        `UPDATE otp_codes
         SET is_used = 1
         WHERE id = ?`,
        [id]
    );
};


// Delete old OTP
const deleteOldOtp = async (
    userId,
    purpose
) => {
    await pool.query(
        `DELETE FROM otp_codes
         WHERE user_id = ?
         AND purpose = ?`,
        [
            userId,
            purpose
        ]
    );
};


module.exports = {
    createOtp,
    findValidOtp,
    markOtpUsed,
    deleteOldOtp
};