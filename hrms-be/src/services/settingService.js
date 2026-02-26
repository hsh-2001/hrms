import settingRepository from "../repositories/settingRepository.js";

const getCompanySettings = async (req) => {
    const { company_id } = req.user;
    console.log("Fetching settings for company_id:", company_id);
    return await settingRepository.getCompanySettings(company_id);
}

const updateCompanySetting = async (req) => {
    const { company_id } = req.user;
    return await settingRepository.updateCompanySetting(company_id, req.body);
}

export default {
    getCompanySettings,
    updateCompanySetting,
}