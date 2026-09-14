const express = require("express");

const router = express.Router();

const scoreController = require("../controllers/score.controller");

const { isLogin } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");


// ========================================
// SCORE MANAGEMENT
// ADMIN + TEACHER
// ========================================

// Get All Scores
router.get(
    "/",
    isLogin,
    allowRoles("admin", "teacher"),
    scoreController.getAllScores
);


// Get Scores By Student
router.get(
    "/student/:studentId",
    isLogin,
    allowRoles("admin", "teacher"),
    scoreController.getScoresByStudent
);


// Get Score By ID
router.get(
    "/:id",
    isLogin,
    allowRoles("admin", "teacher"),
    scoreController.getScoreById
);


// Create Score
router.post(
    "/",
    isLogin,
    allowRoles("admin", "teacher"),
    scoreController.createScore
);


// Update Score
router.put(
    "/:id",
    isLogin,
    allowRoles("admin", "teacher"),
    scoreController.updateScore
);


// Delete Score
router.delete(
    "/:id",
    isLogin,
    allowRoles("admin"),
    scoreController.deleteScore
);


module.exports = router;