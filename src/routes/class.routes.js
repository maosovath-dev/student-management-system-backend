const express = require("express");

const router = express.Router();

const classController = require("../controllers/class.controller");
const classSubjectController = require("../controllers/classSubject.controller");

const { isLogin } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");


// ========================================
// CLASS MANAGEMENT - ADMIN ONLY
// ========================================

// Get All Classes
router.get(
    "/",
    isLogin,
    allowRoles("admin"),
    classController.getAllClasses
);


// Get Class By ID
router.get(
    "/:id",
    isLogin,
    allowRoles("admin"),
    classController.getClassById
);


// Create Class
router.post(
    "/",
    isLogin,
    allowRoles("admin"),
    classController.createNewClass
);


// Update Class
router.put(
    "/:id",
    isLogin,
    allowRoles("admin"),
    classController.updateClass
);


// Delete Class
router.delete(
    "/:id",
    isLogin,
    allowRoles("admin"),
    classController.deleteClass
);


// ========================================
// CLASS ↔ SUBJECT
// ========================================

// Assign Subject To Class
router.post(
    "/:classId/subjects",
    isLogin,
    allowRoles("admin"),
    classSubjectController.assignSubjectToClass
);


// Get Subjects By Class
router.get(
    "/:classId/subjects",
    isLogin,
    allowRoles("admin"),
    classSubjectController.getSubjectsByClass
);


// Remove Subject From Class
router.delete(
    "/:classId/subjects/:subjectId",
    isLogin,
    allowRoles("admin"),
    classSubjectController.removeSubjectFromClass
);


module.exports = router;