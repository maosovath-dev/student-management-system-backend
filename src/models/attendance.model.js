const pool = require("../config/db");

// Get All Attendance
const getAllAttendance = async () => {
  const [rows] = await pool.query(`
        SELECT
            attendance.id,
            attendance.student_id,
            attendance.class_id,
            attendance.date,
            attendance.status,
            attendance.created_at,
            students.student_code,
            students.first_name,
            students.last_name
        FROM attendance
        INNER JOIN students
            ON attendance.student_id = students.id
        ORDER BY attendance.date DESC, attendance.id DESC
    `);
  return rows;
};

// Find Attendance By ID
const findAttendanceById = async (id) => {
  const [rows] = await pool.query(
    `
        SELECT
            attendance.id,
            attendance.student_id,
            attendance.class_id,
            attendance.date,
            attendance.status,
            attendance.created_at,
            students.student_code,
            students.first_name,
            students.last_name
        FROM attendance
        INNER JOIN students
            ON attendance.student_id = students.id
        WHERE attendance.id = ?
    `,
    [id]
  );
  return rows;
};

// Find Attendance By Student
const findAttendanceByStudent = async (studentId) => {
  const [rows] = await pool.query(
    `
        SELECT
            attendance.id,
            attendance.student_id,
            attendance.class_id,
            attendance.date,
            attendance.status,
            attendance.created_at,
            students.student_code,
            students.first_name,
            students.last_name
        FROM attendance
        INNER JOIN students
            ON attendance.student_id = students.id
        WHERE attendance.student_id = ?
        ORDER BY attendance.date DESC
    `,
    [studentId]
  );
  return rows;
};

// Find Attendance By Student And Date
const findAttendanceByStudentAndDate = async (studentId, date) => {
  const [rows] = await pool.query(
    `
        SELECT *
        FROM attendance
        WHERE student_id = ?
        AND date = ?
    `,
    [studentId, date]
  );
  return rows; 
};

const createAttendance = async (body) => {
  const { student_id, date, status, class_id } = body;

  const [result] = await pool.query(
    `INSERT INTO attendance (student_id, class_id, date, status)
     VALUES (?, ?, ?, ?)`,
    [student_id, class_id || null, date, status]
  );
  return result.insertId;
};

// Update Attendance
const updateAttendance = async (id, body) => {
  const { student_id, date, status, class_id } = body;

  const [result] = await pool.query(
    `UPDATE attendance
     SET student_id = ?, class_id = ?, date = ?, status = ?
     WHERE id = ?`,
    [student_id, class_id || null, date, status, id]
  );
  return result;
};

// Delete Attendance
const deleteAttendance = async (id) => {
  const [result] = await pool.query(`DELETE FROM attendance WHERE id = ?`, [
    id,
  ]);
  return result;
};

module.exports = {
  getAllAttendance,
  findAttendanceById,
  findAttendanceByStudent,
  findAttendanceByStudentAndDate,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};