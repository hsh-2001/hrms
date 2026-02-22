import companyRepository from "../repositories/rootRepository.js";

const createNewCompany = async (company) => {
    return await companyRepository.createNewCompany(company);
}

const getAllCompanies = async () => {
    return await companyRepository.getAllCompanies();
}

const updateCompany = async(companyId, company) => {
    return await companyRepository.updateCompany(companyId, company);
}

const deleteCompany = async (companyId) => {
    await companyRepository.deleteCompany(companyId);
}

export default {
    createNewCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
}