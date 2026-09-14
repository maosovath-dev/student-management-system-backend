const express = require("express");

const router = express.Router();

const classController = require("../controllers/class.controller");

const classSubjectController = require("../controllers/classSubject.controller");

const { isLogin } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

// ========================================
// CLASS ↔ SUBJECT
// ========================================

router.post(
    "/:classId/subjects",
    isLogin,
    allowRoles("admin"),
    classSubjectController.assignSubjectToClass
);

router.get(
    "/:classId/subjects",
    isLogin,
    allowRoles("admin"),
    classSubjectController.getSubjectsByClass
);

router.delete(
    "/:classId/subjects/:subjectId",
    isLogin,
    allowRoles("admin"),
    classSubjectController.removeSubjectFromClass
);


// ========================================
// CLASS CRUD
// ========================================

router.get(
    "/",
    isLogin,
    allowRoles("admin"),
    classController.getAllClasses
);

router.post(
    "/",
    isLogin,
    allowRoles("admin"),
    classController.createNewClass
);

router.get(
    "/:id",
    isLogin,
    allowRoles("admin"),
    classController.getClassById
);

router.put(
    "/:id",
    isLogin,
    allowRoles("admin"),
    classController.updateClass
);

router.delete(
    "/:id",
    isLogin,
    allowRoles("admin"),
    classController.deleteClass
);


module.exports = router;