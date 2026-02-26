import BaseResponse from "../helpers/baseResponse.js";
import webSocketService from "../services/webSocketService.js";

const getTransactions = async (req, res) => {
    try {
        const result = webSocketService.getTransactions();
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = webSocketService.getTransactionById(Number(id));
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

export default {
    getTransactions,
    getTransactionById,
};
