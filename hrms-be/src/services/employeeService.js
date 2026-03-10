import employeeRepository from "../repositories/employeeRepository.js";
import userService from "./userService.js";

const createEmployee = async (req) => {
    const { company_id } = req.user;
    const employee = { ...req.body, company_id };
    try {
        const user =  await userService.register({
            username: employee.username,
            email: employee.email,
            phone: employee.phone,
            password: employee.password,
            role_id: 5, // Default role for employee
            company_id
        });
        employee.user_id = user.id;
        return await employeeRepository.createEmployee(employee);
    } catch (error) {
        throw new Error('Failed to create employee: ' + error.message);
    }
}

const getAllEmployees = async (req) => {
    const { company_id } = req.user;
    req.company_id = company_id;
    return await employeeRepository.getAllEmployees(req);
}

const updateEmployee = async (req) => {
    return await employeeRepository.updateEmployee(req);
}

const getEmployeeByFuzzySearch = async (req) => {
    return await employeeRepository.getEmployeeByFuzzySearch(req);
}

export default {
    createEmployee,
    getAllEmployees,
    updateEmployee,
    getEmployeeByFuzzySearch,
}