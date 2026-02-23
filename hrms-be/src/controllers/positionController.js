import BaseResponse from "../helpers/baseResponse.js";
import positionService from "../services/positionService.js";

const createPosition = async (req, res) => {
    try {
        const response = await positionService.createPosition(req);
        BaseResponse.success(res, response, 'Position created successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getAllPositions = async (req, res) => {
    try {
        const response = await positionService.getAllPositions(req);
        BaseResponse.success(res, response, 'Positions retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getPositionById = async (req, res) => {
    try {
        const response = await positionService.getPositionById(req);
        if (!response) {
            return BaseResponse.error(res, 'Position not found', 404);
        }
        BaseResponse.success(res, response, 'Position retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getPositionsByDepartment = async (req, res) => {
    try {
        const response = await positionService.getPositionsByDepartment(req);
        BaseResponse.success(res, response, 'Positions retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const updatePosition = async (req, res) => {
    try {
        const response = await positionService.updatePosition(req);
        if (!response) {
            return BaseResponse.error(res, 'Position not found', 404);
        }
        BaseResponse.success(res, response, 'Position updated successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const deletePosition = async (req, res) => {
    try {
        const response = await positionService.deletePosition(req);
        if (!response) {
            return BaseResponse.error(res, 'Position not found', 404);
        }
        BaseResponse.success(res, response, 'Position deleted successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

export default {
    createPosition,
    getAllPositions,
    getPositionById,
    getPositionsByDepartment,
    updatePosition,
    deletePosition,
}
