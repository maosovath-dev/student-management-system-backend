const classSubjectService =
    require("../services/classSubject.service");

const {
    sendResponse
} = require("../utils/responseHelper");


// ========================================
// ASSIGN SUBJECT TO CLASS
// ========================================

const assignSubjectToClass =
    async (req, res) => {

        try {

            const {
                classId
            } = req.params;

            const {
                subject_id
            } = req.body;


            if (!subject_id) {

                return sendResponse(
                    res,
                    400,
                    false,
                    "subject_id is required"
                );
            }


            const result =
                await classSubjectService
                    .assignSubjectToClass(
                        classId,
                        subject_id
                    );


            return sendResponse(
                res,
                201,
                true,
                "Subject assigned to class successfully",
                result
            );

        } catch (error) {

            console.log(error);

            return sendResponse(
                res,
                400,
                false,
                error.message
            );
        }
    };


// ========================================
// GET SUBJECTS BY CLASS
// ========================================

const getSubjectsByClass =
    async (req, res) => {

        try {

            const {
                classId
            } = req.params;


            const result =
                await classSubjectService
                    .getSubjectsByClass(
                        classId
                    );


            return sendResponse(
                res,
                200,
                true,
                "Get class subjects successfully",
                result
            );

        } catch (error) {

            console.log(error);

            return sendResponse(
                res,
                400,
                false,
                error.message
            );
        }
    };


// ========================================
// REMOVE SUBJECT FROM CLASS
// ========================================

const removeSubjectFromClass =
    async (req, res) => {

        try {

            const {
                classId,
                subjectId
            } = req.params;


            const result =
                await classSubjectService
                    .removeSubjectFromClass(
                        classId,
                        subjectId
                    );


            return sendResponse(
                res,
                200,
                true,
                "Subject removed from class successfully",
                result
            );

        } catch (error) {

            console.log(error);

            return sendResponse(
                res,
                400,
                false,
                error.message
            );
        }
    };


module.exports = {
    assignSubjectToClass,
    getSubjectsByClass,
    removeSubjectFromClass
};