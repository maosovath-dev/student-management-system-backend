const profileService = require("../services/profile.service");

const { sendResponse } = require("../utils/responseHelper");

// GET PROFILE
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile =
            await profileService.getProfileByUserId(userId);

        return sendResponse(
            res,
            200,
            true,
            "Get profile successfully",
            profile
        );

    } catch (error) {
        console.log(error);

        return sendResponse(
            res,
            404,
            false,
            error.message
        );
    }
};


// UPDATE AVATAR
const updateAvatar = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!req.file) {
            return sendResponse(
                res,
                400,
                false,
                "No image uploaded"
            );
        }

        const result =
            await profileService.updateAvatar(
                userId,
                req.file
            );

        return sendResponse(
            res,
            200,
            true,
            "Avatar updated successfully",
            result
        );

    } catch (error) {
        console.log(error);

        return sendResponse(
            res,
            400,
            false,
            error.message
        );
    }
};


// DELETE AVATAR
const deleteAvatar = async (req, res) => {
    try {
        const userId = req.user.id;

        const result =
            await profileService.deleteAvatar(userId);

        return sendResponse(
            res,
            200,
            true,
            result.message
        );

    } catch (error) {
        console.log(error);

        return sendResponse(
            res,
            400,
            false,
            error.message
        );
    }
};


module.exports = {
    getProfile,
    updateAvatar,
    deleteAvatar
};