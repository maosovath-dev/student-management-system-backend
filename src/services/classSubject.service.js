const classSubjectModel =
    require("../models/classSubject.model");

const classModel =
    require("../models/class.model");

const subjectModel =
    require("../models/subject.model");


// ASSIGN SUBJECT TO CLASS
const assignSubjectToClass = async (classId, subjectId) => {

    // Check Class
    const classInfo =
        await classModel.getClassById(classId);

    if (!classInfo) {
        throw new Error("Class not found");
    }


    // Check Subject
  const subjectInfo =
    await subjectModel.findSubjectById(subjectId);

    if (!subjectInfo) {
        throw new Error("Subject not found");
    }


    // Check duplicate
    const existing =
        await classSubjectModel.findAssignment(
            classId,
            subjectId
        );

    if (existing) {
        throw new Error(
            "Subject already assigned to this class"
        );
    }


    // Assign
    const id =
        await classSubjectModel.assignSubject(
            classId,
            subjectId
        );


    return {
        id,
        class_id: Number(classId),
        subject_id: Number(subjectId)
    };
};


// GET SUBJECTS BY CLASS
const getSubjectsByClass = async (classId) => {

    const classInfo =
        await classModel.getClassById(classId);

    if (!classInfo) {
        throw new Error("Class not found");
    }


    return await classSubjectModel.getSubjectsByClass(
        classId
    );
};


// REMOVE SUBJECT FROM CLASS
const removeSubjectFromClass = async (
    classId,
    subjectId
) => {

    const existing =
        await classSubjectModel.findAssignment(
            classId,
            subjectId
        );

    if (!existing) {
        throw new Error(
            "Subject is not assigned to this class"
        );
    }


    await classSubjectModel.removeSubject(
        classId,
        subjectId
    );


    return {
        class_id: Number(classId),
        subject_id: Number(subjectId)
    };
};


module.exports = {
    assignSubjectToClass,
    getSubjectsByClass,
    removeSubjectFromClass
};