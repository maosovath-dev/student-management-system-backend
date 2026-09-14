const studentModel = require('../models/student.model');

const getAllStudents = async () => {
    const students = await studentModel.getAllStudents();

    return students;
}

const findStudentById = async (id) => {
    const student = await studentModel.findStudentById(id);

    return student;
    
};



const getStudentByCode = async (studentCode) => {

    const students =
        await studentModel.findStudentByCode(studentCode);

    if (students.length === 0) {
        throw new Error('Student not found!');
    }

    return students[0];
};

const createNewStudent = async (body) => {

    // Required fields
    if(
        !body.student_code || 
        !body.first_name ||
        !body.last_name ||
        !body.gender
    ){
        throw new Error(
            "Student code, first name, last name and gender are required"
        );
    }

    // Check student code duplicate
    const existingStudent = await studentModel.findStudentByCode(body.student_code);

    if(existingStudent.length > 0){
        throw new Error("Student code already exists");
    }

    const studentId = await studentModel.createStudent(body);

    return studentId;
}

const updateStudent = async (id, body) => {

    // Check student exists
    const student = await studentModel.findStudentById(id);

    if(student.length === 0){
        throw new Error('Student not found!');
    }

    // Required fields
    if(
        !body.student_code ||
        !body.first_name ||
        !body.last_name ||
        !body.gender
    ){
        throw new Error(
            "Student code, first name, last name and gender are required"
        );

    }

    // Check duplicate student code
    const existingStudent = await studentModel.findStudentByCode(body.student_code);

    if(existingStudent.length > 0 && existingStudent[0].id !== Number(id)){
        throw new Error("Student code already exists");
    }

    const result = await studentModel.updateStudent(id, body);

    return result;
}

const deleteStudent = async (id) => {

    // Check student exists
    const student = await studentModel.findStudentById(id);

    if(student.length === 0){
        throw new Error("Student not found!");
    }

    const result = await studentModel.deleteStudent(id);
    
    return result;
}

module.exports = {
    getAllStudents,
    findStudentById,
    getStudentByCode,
    createNewStudent,
    updateStudent,
    deleteStudent
}