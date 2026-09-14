const pool = require("../config/db");

const getAllStudents = async () => {
    const [rows] = await pool.query(`
        SELECT
            s.id,
            s.user_id,
            s.student_code,
            s.first_name,
            s.last_name,
            s.gender,
            s.date_of_birth,
            s.phone,
            s.address,
            s.class_id,
            c.name AS class_name
        FROM students s
        LEFT JOIN classes c
            ON s.class_id = c.id
        ORDER BY s.id DESC
    `);

    return rows;
};

const findStudentById = async (id) => {
  const [rows] = await pool.query(` SELECT * FROM students WHERE id = ? `, [
    id,
  ]);
  return rows;
};

const findStudentByCode = async (studentCode) => {
  const [rows] = await pool.query(
    ` SELECT * FROM students WHERE student_code = ? `,
    [studentCode],
  );
  return rows;
};

// ==== Create Student

// ==== Create Student
const createStudent = async (body) => {
  const arr = [
    body.student_code,
    body.first_name,
    body.last_name,
    body.gender,
    body.date_of_birth || null,
    body.phone || null,
    body.address || null,
    body.class_id || null,   // ✅ បន្ថែម
    body.user_id || null,    // ✅ បន្ថែម (បើមាន)
  ];

  const [result] = await pool.query(
    `INSERT INTO students (
      student_code,
      first_name,
      last_name,
      gender,
      date_of_birth,
      phone,
      address,
      class_id,
      user_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    arr
  );

  const [student] = await pool.query(
    `SELECT * FROM students WHERE id = ?`,
    [result.insertId]
  );

  return student[0];
};

// ============= Update Student
const updateStudent = async (id, body) => {
  const arr = [
    body.student_code,
    body.first_name,
    body.last_name,
    body.gender,
    body.date_of_birth || null,
    body.phone || null,
    body.address || null,
    body.class_id || null,   // ✅ បន្ថែម
    id,
  ];

  await pool.query(
    `UPDATE students 
     SET 
        student_code = ?, 
        first_name = ?,
        last_name = ?,
        gender = ?,
        date_of_birth = ?,
        phone = ?,
        address = ?,
        class_id = ?
     WHERE id = ?`,
    arr
  );

  const [rows] = await pool.query(`SELECT * FROM students WHERE id = ?`, [id]);
  return rows[0] || null;
};
// ========= Delete Student

const deleteStudent = async (id) => {
  const [result] = await pool.query(` DELETE FROM students WHERE id = ? `, [
    id,
  ]);
  return result;
};

module.exports = {
  getAllStudents,
  findStudentById,
  findStudentByCode,
  createStudent,
  updateStudent,
  deleteStudent
};
