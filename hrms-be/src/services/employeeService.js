import employeeRepository from "../repositories/employeeRepository.js";

const createEmployee = async (employee) => {
    return await employeeRepository.createEmployee(employee);
}

export default {
    createEmployee,
}