const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profile.controller");

const handleImageUpload = require("../middleware/handleImageUpload");

const { isLogin } = require("../middleware/auth.middleware");


// ========================================
// GET MY PROFILE
// ========================================

router.get(
    "/",
    isLogin,
    profileController.getProfile
);


// ========================================
// UPLOAD / UPDATE AVATAR
// ========================================

router.post(
    "/avatar",
    isLogin,
    handleImageUpload,
    profileController.updateAvatar
);


// ========================================
// DELETE AVATAR
// ========================================

router.delete(
    "/avatar",
    isLogin,
    profileController.deleteAvatar
);


module.exports = router;