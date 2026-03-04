import settingRepository from "../repositories/settingRepository.js";

const getCompanySettings = async (req) => {
    const { company_id } = req.user;
    return await settingRepository.getCompanySettings(company_id);
}

const updateCompanySetting = async (req) => {
    const { company_id } = req.user;
    return await settingRepository.updateCompanySetting(company_id, req.body);
}

const getCompanyOverview = async (req) => {
    const { company_id } = req.user;
    return await settingRepository.getCompanyOverview(company_id);
}

const getCompanyRolesAndPermissions = async (req) => {
    const { company_id } = req.user;
    return await settingRepository.getCompanyRolesAndPermissions(company_id);
}

const updateRoleAndPermissions = async (req) => {
    return await settingRepository.updateRoleAndPermissions(req);
}

export default {
    getCompanySettings,
    updateCompanySetting,
    getCompanyOverview,
    getCompanyRolesAndPermissions,
    updateRoleAndPermissions,
}