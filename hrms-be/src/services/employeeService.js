import employeeRepository from "../repositories/employeeRepository.js";

const createEmployee = async (req) => {
    const { company_id } = req.user;
    const employee = { ...req.body, company_id };
    return await employeeRepository.createEmployee(employee);
}

const getAllEmployees = async (req) => {
    const { company_id } = req.user;
    return await employeeRepository.getAllEmployees(company_id);
}

export default {
    createEmployee,
    getAllEmployees,
}