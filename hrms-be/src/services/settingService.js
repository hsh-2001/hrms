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
    const result = await settingRepository.getCompanyRolesAndPermissions(company_id);
    if (company_id === 0) {
        return result.filter(role => role.role_id === 2);
    }
    return result.filter(role => ![1, 2].includes(role.role_id));
}

const updateRoleAndPermissions = async (req) => {
    return await settingRepository.updateRoleAndPermissions(req);
}

const updateUserRole = async (req) => {
    return await settingRepository.updateUserRole(req);
}

export default {
    getCompanySettings,
    updateCompanySetting,
    getCompanyOverview,
    getCompanyRolesAndPermissions,
    updateRoleAndPermissions,
    updateUserRole
}