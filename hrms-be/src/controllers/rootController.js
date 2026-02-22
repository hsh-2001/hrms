import BaseResponse from "../helpers/baseResponse.js";
import companyService from "../services/rootService.js";
import userService from "../services/userService.js";

const createNewCompany = async (req, res) => {
    try {
        const result = await companyService.createNewCompany(req.body);
        const { username, password, email, phone } = req.body;
        if (username && password && email && phone) {
            await userService.register({
                username,
                password,
                email,
                phone,
                role: 'company',
                company_id: result.id,
            });
        }
        BaseResponse.success(res, result, 'Company created successfully'); 
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getAllCompanies = async (req, res) => {
    try {
        const result = await companyService.getAllCompanies();
        BaseResponse.success(res, result, 'Companies retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const updateCompany = async (req, res) => {
    const { companyId } = req.params;
    try {
        const result = await companyService.updateCompany(companyId, req.body);
        BaseResponse.success(res, result, 'Company updated successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const deleteCompany = async (req, res) => {
    const { companyId } = req.params;
    try {
        await companyService.deleteCompany(companyId);
        BaseResponse.success(res, null, 'Company deleted successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

export default {
    createNewCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
}