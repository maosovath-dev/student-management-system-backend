const scoreModel = require("../models/score.model");

// Get All Scores
const getAllScores = async () => {
    const scores =
        await scoreModel.getAllScores();

    return scores;
};

// Get Score By ID
const getScoreById = async (id) => {
    const score =
        await scoreModel.findScoreById(id);

    if (score.length === 0) {
        throw new Error("Score not found");
    }

    return score;
};

// Get Scores By Student
const getScoresByStudent = async (studentId) => {
    const scores =
        await scoreModel.findScoreByStudent(studentId);

    return scores;
};

// Create Score
const createScore = async (body) => {

    if (!body.student_id) {
        throw new Error("Student ID is required");
    }

    if (!body.subject_id) {
        throw new Error("Subject ID is required");
    }

    if (body.score === undefined || body.score === null) {
        throw new Error("Score is required");
    }

    if (body.score < 0 || body.score > 100) {
        throw new Error("Score must be between 0 and 100");
    }

    const existingScore =
        await scoreModel.findScoreByStudentAndSubject(
            body.student_id,
            body.subject_id
        );

    if (existingScore.length > 0) {
        throw new Error(
            "Score for this student and subject already exists"
        );
    }

    const scoreId =
        await scoreModel.createScore(body);

    const score =
        await scoreModel.findScoreById(scoreId);

    return score[0];
};

// Update Score
const updateScore = async (id, body) => {

    const existingScore =
        await scoreModel.findScoreById(id);

    if (existingScore.length === 0) {
        throw new Error("Score not found");
    }

    if (!body.student_id) {
        throw new Error("Student ID is required");
    }

    if (!body.subject_id) {
        throw new Error("Subject ID is required");
    }

    if (body.score === undefined || body.score === null) {
        throw new Error("Score is required");
    }

    if (body.score < 0 || body.score > 100) {
        throw new Error("Score must be between 0 and 100");
    }

    const duplicateScore =
        await scoreModel.findScoreByStudentAndSubject(
            body.student_id,
            body.subject_id
        );

    if (
        duplicateScore.length > 0 &&
        duplicateScore[0].id !== Number(id)
    ) {
        throw new Error(
            "Score for this student and subject already exists"
        );
    }

    const result =
        await scoreModel.updateScore(id, body);

    return result;
};

// Delete Score
const deleteScore = async (id) => {

    const existingScore =
        await scoreModel.findScoreById(id);

    if (existingScore.length === 0) {
        throw new Error("Score not found");
    }

    const result =
        await scoreModel.deleteScore(id);

    return result;
};

module.exports = {
    getAllScores,
    getScoreById,
    getScoresByStudent,
    createScore,
    updateScore,
    deleteScore
};