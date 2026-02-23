import { useState } from "react";
import departmentApi from "../lib/departmentApi";
import type { ICreateDepartmentRequest, IGetDepartmentResponse } from "../types/department";

export default function useDepartment() {
  const [departments, setDepartments] = useState<IGetDepartmentResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formModel, setFormModel] = useState<ICreateDepartmentRequest>({
    name: "",
    code: "",
    description: "",
    is_active: true,
    manager_id: "550e8400-e29b-41d4-a716-446655440000",
    company_id: 0,
  });

  const getAllDepartments = async () => {
    try {
      const response = await departmentApi.getAllDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await departmentApi.createDepartment(formModel);
      setIsModalOpen(false);
      getAllDepartments();
    } catch (error) {
      console.error("Failed to create department:", error);
    }
  }

  return {
    departments,
    getAllDepartments,
    isModalOpen,
    setIsModalOpen,
    formModel,
    setFormModel,
    handleSubmit,
  };
}
