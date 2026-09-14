const classModel = require('../models/class.model');

const getAllClasses = async () => {
    const resultClass = await classModel.getAllClasses();
    return resultClass;
};

const getClassById = async (id) => {
    const resultClass = await classModel.getClassById(id);

    if (!resultClass) {
        throw new Error('Class not found!');
    }

    return resultClass;
};

const createNewClass = async (body) => {
    if (!body.name || body.name.trim() === '') {
        throw new Error('Class name is required');
    }

    const existingClass = await classModel.getClassByName(body.name);
    if (existingClass) {
        throw new Error("Class already exists");
    }

    const classId = await classModel.createNewClass(body);
    const newClass = await classModel.getClassById(classId);

    return newClass;
};

const updateClass = async (id, body) => {
    if (!body.name || body.name.trim() === '') {
        throw new Error('Class name is required');
    }

    // ឆែកមើលថាតើ Class ID នេះមានពិតប្រាកដដែរឬទេ
    const isExist = await classModel.getClassById(id);
    if (!isExist) {
        throw new Error('Class not found!');
    }

    // ហៅទៅ Model ដើម្បី Update
    const isUpdated = await classModel.updateClass(id, body);
    if (!isUpdated) {
        throw new Error('Failed to update class');
    }

    // ត្រឡប់ Data ដែលបាន Update រួចមកវិញ
    return await classModel.getClassById(id);
};

const deleteClass = async (id) => { // ថែម parameter id នៅទីនេះ
    // ឆែកមើលថាតើ Class ID នេះមានពិតប្រាកដដែរឬទេ
    const isExist = await classModel.getClassById(id);
    if (!isExist) {
        throw new Error('Class not found!');
    }

    // ហៅទៅ Model ដើម្បី Delete
    const isDeleted = await classModel.deleteClass(id);
    return isDeleted;
};

module.exports = {
    getAllClasses,
    getClassById,
    createNewClass,
    updateClass,
    deleteClass
};