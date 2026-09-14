const pool = require("../config/db");

// ========================================
// ASSIGN SUBJECT TO CLASS
// ========================================

const assignSubject = async (classId, subjectId) => {

    const [result] = await pool.query(
        `INSERT INTO class_subjects
        (class_id, subject_id)
        VALUES (?, ?)`,
        [classId, subjectId]
    );

    return result.insertId;
};


// ========================================
// CHECK ASSIGNMENT
// ========================================

const findAssignment = async (classId, subjectId) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM class_subjects
         WHERE class_id = ?
         AND subject_id = ?`,
        [classId, subjectId]
    );

    return rows[0];
};


// ========================================
// GET SUBJECTS BY CLASS
// ========================================

const getSubjectsByClass = async (classId) => {

    const [rows] = await pool.query(
        `SELECT
            s.id,
            s.name,
            s.description
         FROM class_subjects cs
         INNER JOIN subjects s
            ON cs.subject_id = s.id
         WHERE cs.class_id = ?
         ORDER BY s.id`,
        [classId]
    );

    return rows;
};


// ========================================
// REMOVE SUBJECT FROM CLASS
// ========================================

const removeSubject = async (classId, subjectId) => {

    const [result] = await pool.query(
        `DELETE FROM class_subjects
         WHERE class_id = ?
         AND subject_id = ?`,
        [classId, subjectId]
    );

    return result.affectedRows;
};


module.exports = {
    assignSubject,
    findAssignment,
    getSubjectsByClass,
    removeSubject
};