import BaseResponse from "../helpers/baseResponse.js";
import commonService from "../services/commonService.js";

const verifyLocation = async (req, res) => {
    try {
        const response = await commonService.verifyLocation(req);
        BaseResponse.success(res, response);
    } catch (error) {
        console.error("Error verifying location:", error);
    }
}

export default {
    verifyLocation,
}