import BaseResponse from "../helpers/baseResponse.js";
import settingService from "../services/settingService.js";

const getCompanySettings = async (req, res) => {
    try {
        const result = await settingService.getCompanySettings(req);
        BaseResponse.success(res, result, 'Company settings retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const updateCompanySetting = async (req, res) => {
    try {
        req.body.company_id = req.user.company_id;
        const result = await settingService.updateCompanySetting(req);
        BaseResponse.success(res, result, 'Company settings updated successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getCompanyOverview = async (req, res) => {
    try {
        const result = await settingService.getCompanyOverview(req);
        BaseResponse.success(res, result, 'Company overview retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getCompanyRolesAndPermissions = async (req, res) => {
    try {
        const result = await settingService.getCompanyRolesAndPermissions(req);
        BaseResponse.success(res, result, 'success');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const updateRoleAndPermissions = async (req, res) => {
    try {
        const result = await settingService.updateRoleAndPermissions(req);
        BaseResponse.success(res, result, 'Role permissions updated successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const updateUserRole = async (req, res) => {
    try {
        const result = await settingService.updateUserRole(req);
        BaseResponse.success(res, result, 'User role updated successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const createNewRole = async (req, res) => {
    try {
        const result = await settingService.createNewRole(req);
        BaseResponse.success(res, result, 'New role created successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

export default {
    getCompanySettings,
    updateCompanySetting,
    getCompanyOverview,
    getCompanyRolesAndPermissions,
    updateRoleAndPermissions,
    updateUserRole,
    createNewRole
}