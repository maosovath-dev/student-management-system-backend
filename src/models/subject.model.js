const pool = require("../config/db");

// Get All Subjects
const getAllSubjects = async () => {

    const [rows] = await pool.query(`
        SELECT *
        FROM subjects
        ORDER BY id DESC
    `);

    return rows;
};


// Find Subject By ID
const findSubjectById = async (id) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM subjects
        WHERE id = ?
    `, [id]);

    return rows[0] || null;
};

// Find Subject By Name
const findSubjectByName = async (name) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM subjects
        WHERE name = ?
    `, [name]);

    return rows;
};


// Create Subject
const createSubject = async (body) => {

    const arr = [
        body.name,
        body.description || null
    ];

    const [result] = await pool.query(`
        INSERT INTO subjects (
            name,
            description
        )
        VALUES (?, ?)
    `, arr);

    return result.insertId;
};


// Update Subject
const updateSubject = async (id, body) => {

    const arr = [
        body.name,
        body.description || null,
        id
    ];

    const [result] = await pool.query(`
        UPDATE subjects
        SET
            name = ?,
            description = ?
        WHERE id = ?
    `, arr);

    return result;
};


// Delete Subject
const deleteSubject = async (id) => {

    const [result] = await pool.query(`
        DELETE FROM subjects
        WHERE id = ?
    `, [id]);

    return result;
};


module.exports = {
    getAllSubjects,
    findSubjectById,
    findSubjectByName,
    createSubject,
    updateSubject,
    deleteSubject
};