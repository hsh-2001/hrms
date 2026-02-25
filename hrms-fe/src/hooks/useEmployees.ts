import { useState } from "react";
import type { ICreateEmployee, IEmployee } from "../types/employees";
import companyApi from "../lib/companyApi";

export default function useEmployees() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const [createModel, setCreateModel] = useState<ICreateEmployee>({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    department: "",
    date_of_joining: "",
    status: "active",
  });

  const getEmployees = async () => {
    try {
      const response = await companyApi.getAllEmployees();
      console.log("Employees fetched successfully:", response);
      if (response) {
        setEmployees(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await companyApi.createEmployee(createModel);
      if (response.isSuccess) {
        await getEmployees();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  const onEditEmployee = (id: number) => {
    const emp = employees.find((emp) => emp.id === id);
    if (emp) {
      setCreateModel(emp);
      setIsDialogOpen(true);
    }
  }

  return {
    employee: employees,
    getEmployees,
    createModel,
    setCreateModel,
    handleSubmit,
    isDialogOpen,
    setIsDialogOpen,
    onEditEmployee,
  };
}
