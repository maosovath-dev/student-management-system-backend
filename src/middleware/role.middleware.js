const allowRoles =
    (...roles) => {

        return (req, res, next) => {

            if (!req.user) {

                return res.status(401).json({
                    result: false,
                    msg: "You need to login"
                });
            }


            if (
                !roles.includes(
                    req.user.role
                )
            ) {

                return res.status(403).json({
                    result: false,
                    msg: "You do not have permission"
                });
            }


            next();
        };
    };


module.exports = {
    allowRoles
};