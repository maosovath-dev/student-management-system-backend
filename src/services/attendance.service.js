const attendanceModel =
    require("../models/attendance.model");

// Get All Attendance
const getAllAttendance = async () => {
    const attendance =
        await attendanceModel.getAllAttendance();

    return attendance;
};

// Get Attendance By ID
const getAttendanceById = async (id) => {
    const attendance =
        await attendanceModel.findAttendanceById(id);

    if (attendance.length === 0) {
        throw new Error("Attendance not found");
    }

    return attendance;
};

// Get Attendance By Student
const getAttendanceByStudent = async (studentId) => {
    const attendance =
        await attendanceModel.findAttendanceByStudent(
            studentId
        );

    return attendance;
};

// Create Attendance
const createAttendance = async (body) => {

    if (!body.student_id) {
        throw new Error("Student ID is required");
    }

    if (!body.date) {
        throw new Error("Date is required");
    }

    if (!body.status) {
        throw new Error("Status is required");
    }

    const allowedStatus = [
        "present",
        "absent",
        "late"
    ];

    if (!allowedStatus.includes(body.status)) {
        throw new Error(
            "Status must be present, absent or late"
        );
    }

    const existingAttendance =
        await attendanceModel.findAttendanceByStudentAndDate(
            body.student_id,
            body.date
        );

    if (existingAttendance.length > 0) {
        throw new Error(
            "Attendance for this student on this date already exists"
        );
    }

    const attendanceId =
        await attendanceModel.createAttendance(body);

    const attendance =
        await attendanceModel.findAttendanceById(
            attendanceId
        );

    return attendance[0];
};

// Update Attendance
const updateAttendance = async (id, body) => {

    const existingAttendance =
        await attendanceModel.findAttendanceById(id);

    if (existingAttendance.length === 0) {
        throw new Error("Attendance not found");
    }

    if (!body.student_id) {
        throw new Error("Student ID is required");
    }

    if (!body.date) {
        throw new Error("Date is required");
    }

    if (!body.status) {
        throw new Error("Status is required");
    }

    const allowedStatus = [
        "present",
        "absent",
        "late"
    ];

    if (!allowedStatus.includes(body.status)) {
        throw new Error(
            "Status must be present, absent or late"
        );
    }

    const duplicateAttendance =
        await attendanceModel.findAttendanceByStudentAndDate(
            body.student_id,
            body.date
        );

    if (
        duplicateAttendance.length > 0 &&
        duplicateAttendance[0].id !== Number(id)
    ) {
        throw new Error(
            "Attendance for this student on this date already exists"
        );
    }

    await attendanceModel.updateAttendance(
        id,
        body
    );

    const attendance =
        await attendanceModel.findAttendanceById(id);

    return attendance[0];
};

// Delete Attendance
const deleteAttendance = async (id) => {

    const existingAttendance =
        await attendanceModel.findAttendanceById(id);

    if (existingAttendance.length === 0) {
        throw new Error("Attendance not found");
    }

    const result =
        await attendanceModel.deleteAttendance(id);

    return result;
};

module.exports = {
    getAllAttendance,
    getAttendanceById,
    getAttendanceByStudent,
    createAttendance,
    updateAttendance,
    deleteAttendance
};