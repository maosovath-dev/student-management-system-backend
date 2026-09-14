const attendanceService = require("../services/attendance.service");

const { sendResponse } = require("../utils/responseHelper");

// Get All Attendance
const getAllAttendance = async (req, res) => {
    try {
        const attendance =
            await attendanceService.getAllAttendance();

        sendResponse(
            res,
            200,
            true,
            "Attendance retrieved successfully",
            attendance
        );

    } catch (error) {
        sendResponse(
            res,
            500,
            false,
            error.message
        );
    }
};

// Get Attendance By ID
const getAttendanceById = async (req, res) => {
    try {
        const id = req.params.id;

        const attendance =
            await attendanceService.getAttendanceById(id);

        sendResponse(
            res,
            200,
            true,
            "Attendance retrieved successfully",
            attendance
        );

    } catch (error) {
        if (error.message === "Attendance not found") {
            sendResponse(
                res,
                404,
                false,
                error.message
            );
        } else {
            sendResponse(
                res,
                500,
                false,
                error.message
            );
        }
    }
};

// Get Attendance By Student
const getAttendanceByStudent = async (req, res) => {
    try {
        const studentId =
            req.params.studentId;

        const attendance =
            await attendanceService.getAttendanceByStudent(
                studentId
            );

        sendResponse(
            res,
            200,
            true,
            "Student attendance retrieved successfully",
            attendance
        );

    } catch (error) {
        sendResponse(
            res,
            500,
            false,
            error.message
        );
    }
};

// Create Attendance
const createAttendance = async (req, res) => {
    try {
        const attendance =
            await attendanceService.createAttendance(
                req.body
            );

        sendResponse(
            res,
            201,
            true,
            "Attendance created successfully",
            attendance
        );

    } catch (error) {

        if (
            error.message.includes("required") ||
            error.message.includes("must be") ||
            error.message.includes("already exists")
        ) {
            sendResponse(
                res,
                400,
                false,
                error.message
            );
        } else {
            sendResponse(
                res,
                500,
                false,
                error.message
            );
        }
    }
};

// Update Attendance
const updateAttendance = async (req, res) => {
    try {
        const id = req.params.id;

        const attendance =
            await attendanceService.updateAttendance(
                id,
                req.body
            );

        sendResponse(
            res,
            200,
            true,
            "Attendance updated successfully",
            attendance
        );

    } catch (error) {

        if (error.message === "Attendance not found") {
            sendResponse(
                res,
                404,
                false,
                error.message
            );
        } else if (
            error.message.includes("required") ||
            error.message.includes("must be") ||
            error.message.includes("already exists")
        ) {
            sendResponse(
                res,
                400,
                false,
                error.message
            );
        } else {
            sendResponse(
                res,
                500,
                false,
                error.message
            );
        }
    }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
    try {
        const id = req.params.id;

        await attendanceService.deleteAttendance(id);

        sendResponse(
            res,
            200,
            true,
            "Attendance deleted successfully"
        );

    } catch (error) {

        if (error.message === "Attendance not found") {
            sendResponse(
                res,
                404,
                false,
                error.message
            );
        } else {
            sendResponse(
                res,
                500,
                false,
                error.message
            );
        }
    }
};

module.exports = {
    getAllAttendance,
    getAttendanceById,
    getAttendanceByStudent,
    createAttendance,
    updateAttendance,
    deleteAttendance
};