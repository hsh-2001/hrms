import departmentRepository from "../repositories/departmentRepository.js";

const createDepartment = async (req) => {
    const { company_id } = req.user;
    const department = { ...req.body, company_id };
    return await departmentRepository.createDepartment(department);
}

const getAllDepartments = async (req) => {
    const { company_id } = req.user;
    return await departmentRepository.getAllDepartments(company_id);
}

const getDepartmentById = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    return await departmentRepository.getDepartmentById(id, company_id);
}

const updateDepartment = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    return await departmentRepository.updateDepartment(id, company_id, req.body);
}

const deleteDepartment = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    return await departmentRepository.deleteDepartment(id, company_id);
}

export default {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
}
