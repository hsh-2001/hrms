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

export default {
    getCompanySettings,
    updateCompanySetting,
    getCompanyOverview,
}