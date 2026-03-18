import BaseResponse from '../helpers/baseResponse.js';
import userService from '../services/userService.js';

const register = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        BaseResponse.success(res, result, 'User registered successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
};

const login = async (req, res) => { 
    try {
        const result = await userService.login(res, req.body);
        BaseResponse.success(res, result, 'User logged in successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 401);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        BaseResponse.success(res, result, 'Users retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, 'Internal server error', 500);
    }
};

const getUserByCompanyId = async (req, res) => {
    try {
        const result = await userService.getUserByCompanyId(req);
        BaseResponse.success(res, result, 'Users retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
};

const resetPassword = async (req, res) => {
    try {
        const { user_id, password } = req.body;
        const result = await userService.resetPassword(user_id, password);
        BaseResponse.success(res, result, 'Password reset successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
};

export default {
    register,
    login,
    getAllUsers,
    getUserByCompanyId,
    resetPassword,
}