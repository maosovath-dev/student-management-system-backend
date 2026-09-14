const express = require('express');
const { sendResponse } = require('../utils/responseHelper');
const classServices = require('../services/class.service'); // Added import

const getAllClasses = async (req, res) => {
  try {
    const classes = await classServices.getAllClasses();
    sendResponse(res, 200, true, 'Classes retrieved successfully', classes);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const myClass = await classServices.getClassById(id);

    if (!myClass) {
      return sendResponse(res, 404, false, 'Class not found');
    }

    return sendResponse(res, 200, true, 'Class retrieved successfully', myClass);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const createNewClass = async (req, res) => {
  try {
    const body = req.body;
    const myClass = await classServices.createNewClass(body);

    return sendResponse(res, 201, true, 'Class created successfully', myClass);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedClass = await classServices.updateClass(id, body);

    return sendResponse(res, 200, true, 'Class updated successfully', updatedClass);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    await classServices.deleteClass(id);

    return sendResponse(res, 200, true, 'Class deleted successfully');
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createNewClass,
  updateClass,
  deleteClass
};