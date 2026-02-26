import BaseResponse from "../helpers/baseResponse.js";
import settingService from "../services/settingService.js";

const getCompanySettings = async (req, res) => {
    try {
        const result = await settingService.getCompanySettings(req);
        BaseResponse.success(res, result, 'Company settings retrieved successfully');
    } catch (error) {
        console.log("Error retrieving company settings:", error);
        BaseResponse.error(res, error.message, 500);
    }
}

export default {
    getCompanySettings,
}