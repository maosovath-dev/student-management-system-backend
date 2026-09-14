const subjectService = require('../services/subject.service');
const { sendResponse } = require('../utils/responseHelper');

// Get All Subjects
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await subjectService.getAllSubjects();

        sendResponse(res, 200, true, "Subjects retrieved successfully", subjects);

    } catch (error) {

        sendResponse(res, 500, false, error.message);
    }
};

// Get Subject By ID
const getSubjectById = async (req, res) => {
    try {

        const id = req.params.id;

        const subject = await subjectService.getSubjectById(id);

        if (subject.length === 0) {

            sendResponse(res, 404, false, "Subject not found");
        } else {
            sendResponse(res, 200, true, "Subject retrieved successfully", subject);
        }
    } catch (error) {

        sendResponse(res, 500, false, error.message
        );
    }
};


// Get Subject By Name
const getSubjectByName = async (req, res) => {

    try {
        const name = req.params.name;

        const subject = await subjectService.getSubjectByName(name);

        if (subject.length === 0) {

            sendResponse(res, 404, false, "Subject not found");

        } else {
            sendResponse(res, 200, true, "Subject retrieved successfully", subject);
        }

    } catch (error) {

        sendResponse(res, 500, false, error.message);
    }
};

// Create Subject
const createSubject = async (req, res) => {
    try {
        const subject = await subjectService.createSubject(req.body);

        sendResponse(res, 201, true, "Subject created successfully", subject);

    } catch (error) {

        if (error.message.includes("required") || error.message.includes("already exists")) {
            sendResponse(res, 400, false, error.message);
        } else {
            sendResponse(res, 500, false, error.message);
        }
    }
};


// Update Subject
const updateSubject = async (req, res) => {

    try {
        const id = req.params.id;
        const updatedSubject = await subjectService.updateSubject(id,req.body);

        sendResponse(res, 200, true, "Subject updated successfully",updatedSubject);
    } catch (error) {

        if (error.message === "Subject not found") {
            sendResponse(res, 404, false,error.message);

        } else if (error.message.includes("required") || error.message.includes("already exists")) {

            sendResponse(res, 400, false, error.message);
        } else {
            sendResponse(res, 500, false, error.message);
        }
    }
};

// Delete Subject
const deleteSubject = async (req, res) => {

    try {
        const id = req.params.id;

        await subjectService.deleteSubject(id);

        sendResponse(res, 200, true, "Subject deleted successfully");

    } catch (error) {

        if (error.message === "Subject not found") {
            sendResponse(res, 404, false, error.message);

        } else {

            sendResponse(res, 500, false, error.message);
        }
    }
};


module.exports = {
    getAllSubjects,
    getSubjectById,
    getSubjectByName,
    createSubject,
    updateSubject,
    deleteSubject
};