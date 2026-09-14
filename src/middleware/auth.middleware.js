const jwt = require("jsonwebtoken");

const user = require("../models/user.model");

const isLogin = async (req, res, next) => {

        try {

            const authHeader = req.headers.authorization;

            if (!authHeader) {

                return res.status(401).json({
                    result: false,
                    msg: "You need to login"
                });
            }


            const parts =
                authHeader.split(" ");


            if (
                parts.length !== 2 ||
                parts[0] !== "Bearer"
            ) {

                return res.status(401).json({
                    result: false,
                    msg: "Invalid authorization header"
                });
            }


            const token = parts[1];


            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

            const row = await user.getByToken(token);

            if (!row) {

                return res.status(401).json({
                    result: false,
                    msg: "Invalid or expired token"
                });
            }


            if (
                row.status !== "active"
            ) {

                return res.status(403).json({
                    result: false,
                    msg: "Your account is inactive"
                });
            }


            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            };


            next();

        } catch (error) {

            console.log(error);

            return res.status(401).json({
                result: false,
                msg: "Invalid or expired token"
            });
        }
    };


module.exports = {
    isLogin
};