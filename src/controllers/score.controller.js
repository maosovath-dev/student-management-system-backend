const scoreService = require("../services/score.service");

const { sendResponse } = require("../utils/responseHelper");

// Get All Scores
const getAllScores = async (req, res) => {
    try {
        const scores =
            await scoreService.getAllScores();

        sendResponse(
            res,
            200,
            true,
            "Scores retrieved successfully",
            scores
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

// Get Score By ID
const getScoreById = async (req, res) => {
    try {
        const id = req.params.id;

        const score =
            await scoreService.getScoreById(id);

        if (score.length === 0) {
            sendResponse(
                res,
                404,
                false,
                "Score not found"
            );
        } else {
            sendResponse(
                res,
                200,
                true,
                "Score retrieved successfully",
                score
            );
        }

    } catch (error) {
        sendResponse(
            res,
            404,
            false,
            error.message
        );
    }
};

// Get Scores By Student
const getScoresByStudent = async (req, res) => {
    try {
        const studentId =
            req.params.studentId;

        const scores =
            await scoreService.getScoresByStudent(
                studentId
            );

        sendResponse(
            res,
            200,
            true,
            "Student scores retrieved successfully",
            scores
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

// Create Score
const createScore = async (req, res) => {
    try {
        const score =
            await scoreService.createScore(
                req.body
            );

        sendResponse(
            res,
            201,
            true,
            "Score created successfully",
            score
        );

    } catch (error) {

        if (
            error.message.includes("required") ||
            error.message.includes("between") ||
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

// Update Score
const updateScore = async (req, res) => {
    try {
        const id = req.params.id;

        await scoreService.updateScore(
            id,
            req.body
        );

        const score =
            await scoreService.getScoreById(id);

        sendResponse(
            res,
            200,
            true,
            "Score updated successfully",
            score[0]
        );

    } catch (error) {

        if (error.message === "Score not found") {
            sendResponse(
                res,
                404,
                false,
                error.message
            );
        } else if (
            error.message.includes("required") ||
            error.message.includes("between") ||
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

// Delete Score
const deleteScore = async (req, res) => {
    try {
        const id = req.params.id;

        await scoreService.deleteScore(id);

        sendResponse(
            res,
            200,
            true,
            "Score deleted successfully"
        );

    } catch (error) {

        if (error.message === "Score not found") {
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
    getAllScores,
    getScoreById,
    getScoresByStudent,
    createScore,
    updateScore,
    deleteScore
};