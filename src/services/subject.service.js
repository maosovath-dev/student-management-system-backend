const subjectModel = require("../models/subject.model");

// Get All Subjects
const getAllSubjects = async () => {

    const subjects = await subjectModel.getAllSubjects();

    return subjects;
};

// Get Subject By ID
const getSubjectById = async (id) => {

    const subject = await subjectModel.findSubjectById(id);

    if (subject.length === 0) {
        throw new Error("Subject not found");
    }

    return subject;
};

// Get Subject By Name
const getSubjectByName = async (name) => {

    const subject = await subjectModel.findSubjectByName(name);

    return subject;
};

// Create Subject
const createSubject = async (body) => {
    if (!body.name) {
        throw new Error("Subject name is required");
    }

    const existingSubject = await subjectModel.findSubjectByName(body.name);

    if (existingSubject.length > 0) {
        throw new Error("Subject already exists");
    }

    const subjectId = await subjectModel.createSubject(body);

    const subject = await subjectModel.findSubjectById(subjectId);

    return subject[0];
};

// Update Subject
const updateSubject = async (id, body) => {

    const subject = await subjectModel.findSubjectById(id);

    if (subject.length === 0) {
        throw new Error("Subject not found");
    }

    if (!body.name) {
        throw new Error("Subject name is required");
    }

    const existingSubject = await subjectModel.findSubjectByName(body.name);

    if (
        existingSubject.length > 0 &&
        existingSubject[0].id !== Number(id)
    ) {
        throw new Error("Subject already exists");
    }
    await subjectModel.updateSubject(id, body);

    const updatedSubject = await subjectModel.findSubjectById(id);

    return updatedSubject[0];
};

// Delete Subject
const deleteSubject = async (id) => {

    const subject = await subjectModel.findSubjectById(id);

    if (subject.length === 0) {
        throw new Error("Subject not found");
    }

    const result = await subjectModel.deleteSubject(id);

    return result;
};


module.exports = {
    getAllSubjects,
    getSubjectById,
    getSubjectByName,
    createSubject,
    updateSubject,
    deleteSubject
};