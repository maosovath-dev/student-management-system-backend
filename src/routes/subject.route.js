const express = require("express");

const router = express.Router();

const subjectController = require("../controllers/subject.controller");

const { isLogin } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");


// ===============================
// Subject Management
// ADMIN + TEACHER VIEW
// ===============================

// Get All Subjects
router.get(
    "/",
    isLogin,
    allowRoles("admin", "teacher"),
    subjectController.getAllSubjects
);


// Get Subject By Name
router.get(
    "/name/:name",
    isLogin,
    allowRoles("admin", "teacher"),
    subjectController.getSubjectByName
);


// Get Subject By ID
router.get(
    "/:id",
    isLogin,
    allowRoles("admin", "teacher"),
    subjectController.getSubjectById
);


// Create Subject - ADMIN ONLY
router.post(
    "/",
    isLogin,
    allowRoles("admin"),
    subjectController.createSubject
);


// Update Subject - ADMIN ONLY
router.put(
    "/:id",
    isLogin,
    allowRoles("admin"),
    subjectController.updateSubject
);


// Delete Subject - ADMIN ONLY
router.delete(
    "/:id",
    isLogin,
    allowRoles("admin"),
    subjectController.deleteSubject
);


module.exports = router;