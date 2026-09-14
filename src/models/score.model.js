const pool = require("../config/db");

// Get All Scores
const getAllScores = async () => {
    const [rows] = await pool.query(`
        SELECT
            scores.id,
            scores.student_id,
            scores.subject_id,
            scores.score,
            scores.semester,
            scores.created_at,
            students.student_code,
            students.first_name,
            students.last_name,
            subjects.name AS subject_name
        FROM scores
        INNER JOIN students
            ON scores.student_id = students.id
        INNER JOIN subjects
            ON scores.subject_id = subjects.id
        ORDER BY scores.id DESC
    `);

    return rows;
};

// Find Score By ID
const findScoreById = async (id) => {
    const [rows] = await pool.query(`
        SELECT
            scores.id,
            scores.student_id,
            scores.subject_id,
            scores.score,
            scores.semester,
            scores.created_at,
            students.student_code,
            students.first_name,
            students.last_name,
            subjects.name AS subject_name
        FROM scores
        INNER JOIN students
            ON scores.student_id = students.id
        INNER JOIN subjects
            ON scores.subject_id = subjects.id
        WHERE scores.id = ?
    `, [id]);

    return rows;
};

// Find Score By Student
const findScoreByStudent = async (studentId) => {
    const [rows] = await pool.query(`
        SELECT
            scores.id,
            scores.student_id,
            scores.subject_id,
            scores.score,
            scores.semester,
            scores.created_at,
            students.student_code,
            students.first_name,
            students.last_name,
            subjects.name AS subject_name
        FROM scores
        INNER JOIN students
            ON scores.student_id = students.id
        INNER JOIN subjects
            ON scores.subject_id = subjects.id
        WHERE scores.student_id = ?
        ORDER BY scores.id DESC
    `, [studentId]);

    return rows;
};

// Find Score By Student And Subject
const findScoreByStudentAndSubject = async (
    studentId,
    subjectId
) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM scores
        WHERE student_id = ?
        AND subject_id = ?
    `, [studentId, subjectId]);

    return rows;
};

// Create Score
const createScore = async (body) => {
    const arr = [
        body.student_id,
        body.subject_id,
        body.score,
        body.semester || null
    ];

    const [result] = await pool.query(`
        INSERT INTO scores (
            student_id,
            subject_id,
            score,
            semester
        )
        VALUES (?, ?, ?, ?)
    `, arr);

    return result.insertId;
};

// Update Score
const updateScore = async (id, body) => {
    const arr = [
        body.student_id,
        body.subject_id,
        body.score,
        body.semester || null,
        id
    ];

    const [result] = await pool.query(`
        UPDATE scores
        SET
            student_id = ?,
            subject_id = ?,
            score = ?,
            semester = ?
        WHERE id = ?
    `, arr);

    return result;
};

// Delete Score
const deleteScore = async (id) => {
    const [result] = await pool.query(`
        DELETE FROM scores
        WHERE id = ?
    `, [id]);

    return result;
};

module.exports = {
    getAllScores,
    findScoreById,
    findScoreByStudent,
    findScoreByStudentAndSubject,
    createScore,
    updateScore,
    deleteScore
};