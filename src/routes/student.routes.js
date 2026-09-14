const express = require("express");

const router = express.Router();

const studentController = require("../controllers/student.controller");

const { isLogin } = require("../middleware/auth.middleware");

const { allowRoles } = require("../middleware/role.middleware");


// ===============================
// Student Management - ADMIN ONLY
// ===============================

// router.get(
//     "/",
//     isLogin,
//     allowRoles("admin"),
//     studentController.getAllStudents
// );

router.get(
    "/",
    studentController.getAllStudents
);

router.get(
    "/student_code/:studentCode",
    isLogin,
    allowRoles("admin"),
    studentController.getStudentByCode
);

router.get(
    "/:id",
    isLogin,
    allowRoles("admin"),
    studentController.getStudentById
);

router.post(
    "/",
    isLogin,
    allowRoles("admin"),
    studentController.createNewStudent
);

router.put(
    "/:id",
    isLogin,
    allowRoles("admin"),
    studentController.updateStudent
);

router.delete(
    "/:id",
    isLogin,
    allowRoles("admin"),
    studentController.deleteStudent
);


module.exports = router;