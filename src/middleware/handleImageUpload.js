const multer = require("multer");

const uploadImg = require("./upload.middleware");

const handleProfileUpload = (req, res, next) => {
    const upload = uploadImg.single("image");

    upload(req, res, (err) => {

        if (err instanceof multer.MulterError) {

            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    result: false,
                    message:
                        "Image is too large, please choose an image under 2MB",
                });
            }

            return res.status(400).json({
                result: false,
                message: err.message,
            });
        }

        if (err) {
            console.log(err);

            return res.status(500).json({
                result: false,
                message:
                    "There is a problem uploading the image",
            });
        }

        next();
    });
};

module.exports = handleProfileUpload;