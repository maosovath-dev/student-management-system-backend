const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendance.controller");

const { isLogin } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

// View All Attendance
router.get(
    "/",
    isLogin,
    allowRoles("admin", "teacher"),
    attendanceController.getAllAttendance
);

// View Attendance By Student
router.get(
    "/student/:studentId",
    isLogin,
    allowRoles("admin", "teacher"),
    attendanceController.getAttendanceByStudent
);

// View Attendance By ID
router.get(
    "/:id",
    isLogin,
    allowRoles("admin", "teacher"),
    attendanceController.getAttendanceById
);

// Teacher + Admin can record attendance
router.post(
    "/",
    isLogin,
    allowRoles("admin", "teacher"),
    attendanceController.createAttendance
);

// Teacher + Admin can correct attendance
router.put(
    "/:id",
    isLogin,
    allowRoles("admin", "teacher"),
    attendanceController.updateAttendance
);

// Only Admin can delete
router.delete(
    "/:id",
    isLogin,
    allowRoles("admin"),
    attendanceController.deleteAttendance
);

module.exports = router;