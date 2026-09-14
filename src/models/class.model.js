const pool = require("../config/db");

const getAllClasses = async () => {
    const [rows] = await pool.query('SELECT * FROM classes ORDER BY id DESC');

    return rows;
}

const getClassById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM classes WHERE id = ?', [id]);

    return rows[0] || null;

}
// 1. បន្ថែម Function នេះសម្រាប់ឆែកឈ្មោះថ្នាក់ដែលជាន់គ្នា
const getClassByName = async (name) => {
    const [rows] = await pool.query('SELECT * FROM classes WHERE name = ?', [name]);
    return rows[0] || null;
}

const createNewClass = async (body) => {
    const arr = [
        body.name,
        body.description || null
    ]

    const [result] = await pool.query('INSERT INTO classes (name, description) VALUES (?, ?)', arr)

    return result.insertId;
}

const updateClass = async (id, body) => {

    const arr = [
            body.name,
            body.description || null, 
            id
        ];

    const [result] = await pool.query('UPDATE classes SET name = ?, description = ? WHERE id = ?', arr);

    return result.affectedRows > 0;
}

const deleteClass = async (id) => {

    const [result] = await pool.query('DELETE FROM classes WHERE id = ?' , [id]);

    return  result.affectedRows > 0;
}



module.exports = {
    getAllClasses,
    getClassById,
    getClassByName,
    createNewClass,
    updateClass,
    deleteClass


}