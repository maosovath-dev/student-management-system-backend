const pool = require("../config/db");


// Find user by email
const findByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            name,
            email,
            password,
            role,
            status,
            is_verified,
            avatar_url,
            avatar_public_id,
            token,
            created_at,
            updated_at
        FROM users
        WHERE email = ?`,
        [email]
    );

    return rows[0] || null;
};


// Find user by ID
const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            name,
            email,
            role,
            status,
            is_verified,
            avatar_url,
            avatar_public_id,
            created_at,
            updated_at
        FROM users
        WHERE id = ?`,
        [id]
    );

    return rows[0] || null;
};


// Create Teacher / Student
const create = async (body) => {
    const [result] = await pool.query(
        `INSERT INTO users
        (
            name,
            email,
            role,
            status,
            is_verified
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            body.name,
            body.email,
            body.role,
            body.status || "active",
            body.is_verified || 0
        ]
    );

    return result.insertId;
};


// Update password
const updatePassword = async (id, password) => {
    const [result] = await pool.query(
        `UPDATE users
         SET password = ?
         WHERE id = ?`,
        [password, id]
    );

    return result;
};


// Verify email
const verifyEmail = async (id) => {
    const [result] = await pool.query(
        `UPDATE users
         SET is_verified = 1
         WHERE id = ?`,
        [id]
    );

    return result;
};


// Save JWT token
const addToken = async (token, id) => {
    const [result] = await pool.query(
        `UPDATE users
         SET token = ?
         WHERE id = ?`,
        [token, id]
    );

    return result;
};


// Find user by JWT token
const getByToken = async (token) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            name,
            email,
            role,
            status,
            is_verified,
            avatar_url,
            avatar_public_id,
            token
        FROM users
        WHERE token = ?`,
        [token]
    );

    return rows[0] || null;
};


// Delete token when logout
const deleteToken = async (id) => {
    const [result] = await pool.query(
        `UPDATE users
         SET token = NULL
         WHERE id = ?`,
        [id]
    );

    return result;
};


// Update avatar
const updateAvatar = async (
    id,
    avatarUrl,
    avatarPublicId
) => {

    const [result] = await pool.query(
        `UPDATE users
         SET
            avatar_url = ?,
            avatar_public_id = ?
         WHERE id = ?`,
        [
            avatarUrl,
            avatarPublicId,
            id
        ]
    );

    return result;
};


module.exports = {
    findByEmail,
    findById,
    create,
    updatePassword,
    verifyEmail,
    addToken,
    getByToken,
    deleteToken,
    updateAvatar
};