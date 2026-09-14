const userModel = require("../models/user.model");
const cloudinary = require("../config/cloudinary");

// GET PROFILE
const getProfileByUserId = async (userId) => {
    const user = await userModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};


// UPLOAD / UPDATE AVATAR
const updateAvatar = async (userId, file) => {

    if (!file) {
        throw new Error("Avatar image is required");
    }

    const user = await userModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }


    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "student-management/avatars",

                resource_type: "image",

                transformation: [
                    {
                        width: 500,
                        height: 500,
                        crop: "limit",
                    },
                    {
                        quality: "auto:eco",
                        fetch_format: "auto",
                    },
                ],
            },

            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        stream.end(file.buffer);
    });


    // Delete old avatar after new upload succeeds
    if (user.avatar_public_id) {

        await cloudinary.uploader.destroy(
            user.avatar_public_id
        );
    }


    // Save new avatar information in MySQL
    const dbResult = await userModel.updateAvatar(
        userId,
        uploadResult.secure_url,
        uploadResult.public_id
    );


    if (dbResult.affectedRows === 0) {
        throw new Error("Failed to update avatar");
    }


    return {
        avatar_url: uploadResult.secure_url,
        avatar_public_id: uploadResult.public_id
    };
};


// DELETE AVATAR
const deleteAvatar = async (userId) => {

    const user = await userModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.avatar_public_id) {
        throw new Error("Avatar not found");
    }


    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(
        user.avatar_public_id
    );


    // Remove avatar information from MySQL
    const result = await userModel.updateAvatar(
        userId,
        null,
        null
    );


    if (result.affectedRows === 0) {
        throw new Error("Failed to delete avatar");
    }


    return {
        message: "Avatar deleted successfully"
    };
};


module.exports = {
    getProfileByUserId,
    updateAvatar,
    deleteAvatar
};