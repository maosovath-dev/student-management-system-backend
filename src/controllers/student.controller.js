const studentService = require('../services/student.service');
const { sendResponse } = require('../utils/responseHelper');

const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    sendResponse(res, 200, true, 'Students retrieved successfully', students);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentService.findStudentById(id);

    // ប្រសិនបើរករកមិនឃើញ ឬ Array ទទេ
    if (!student || student.length === 0) {
      return sendResponse(res, 404, false, 'Student not found');
    }

    // ប្រសិនបើ Service return ជា Array [student] ត្រូវទាញយក element ទី ០
    const data = Array.isArray(student) ? student[0] : student;
    sendResponse(res, 200, true, 'Student retrieved successfully', data);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

const getStudentByCode = async (req, res) => {
  try {
    const studentCode = req.params.studentCode;
    const student = await studentService.getStudentByCode(studentCode);

    if (!student || student.length === 0) {
      return sendResponse(res, 404, false, 'Student not found');
    }

    const data = Array.isArray(student) ? student[0] : student;
    sendResponse(res, 200, true, 'Student retrieved successfully', data);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

const createNewStudent = async (req, res) => {
  try {
    const body = req.body;
    const student = await studentService.createNewStudent(body);

    sendResponse(res, 201, true, 'Student created successfully', student);
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedStudent = await studentService.updateStudent(id, body);

    if (!updatedStudent) {
      return sendResponse(res, 404, false, 'Student not found');
    }

    sendResponse(res, 200, true, 'Student updated successfully', updatedStudent);
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await studentService.deleteStudent(id);

    // ពិនិត្យមើលថា តើមាន Row ណាមួយត្រូវ Delete ដែរឬទេ (affectedRows > 0)
    if (result && result.affectedRows === 0) {
      return sendResponse(res, 404, false, 'Student not found');
    }

    sendResponse(res, 200, true, 'Student deleted successfully');
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  getStudentByCode,
  createNewStudent,
  updateStudent,
  deleteStudent,
};