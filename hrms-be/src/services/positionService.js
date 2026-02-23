import positionRepository from "../repositories/positionRepository.js";

const createPosition = async (req) => {
    const { company_id } = req.user;
    const position = { ...req.body, company_id };
    return await positionRepository.createPosition(position);
}

const getAllPositions = async (req) => {
    const { company_id } = req.user;
    return await positionRepository.getAllPositions(company_id);
}

const getPositionById = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    return await positionRepository.getPositionById(id, company_id);
}

const getPositionsByDepartment = async (req) => {
    const { company_id } = req.user;
    const { departmentId } = req.params;
    return await positionRepository.getPositionsByDepartment(departmentId, company_id);
}

const updatePosition = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    return await positionRepository.updatePosition(id, company_id, req.body);
}

const deletePosition = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    return await positionRepository.deletePosition(id, company_id);
}

export default {
    createPosition,
    getAllPositions,
    getPositionById,
    getPositionsByDepartment,
    updatePosition,
    deletePosition,
}
