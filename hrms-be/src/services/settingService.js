import settingRepository from "../repositories/settingRepository.js";

const getCompanySettings = async (req) => {
    const { company_id } = req.user;
    console.log("Fetching settings for company_id:", company_id);
    return await settingRepository.getCompanySettings(company_id);
}

export default {
    getCompanySettings,
}