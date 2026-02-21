import { useState } from "react";
import type { ICreateEmployee, IEmployee } from "../types/employees";

export default function useEmployees() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employee, setEmployee] = useState<IEmployee[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      position: "Software Engineer",
      department: "Engineering",
      dateOfJoining: "2022-01-01",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      position: "Product Manager",
      department: "Product",
      dateOfJoining: "2023-03-15",
      status: "active",
    },
  ]);

  const [createModel, setCreateModel] = useState<ICreateEmployee>({
    name: "",
    email: "",
    position: "",
    department: "",
    dateOfJoining: "",
    status: "active",
  });

  const handleSubmit = () => {
    const newEmployee: IEmployee = {
      id: employee.length + 1,
      ...createModel,
    };
    setEmployee([...employee, newEmployee]);
    setCreateModel({
      name: "",
      email: "",
      position: "",
      department: "",
      dateOfJoining: "",
      status: "active",
    });
    setIsDialogOpen(false);
  };

  const onEditEmployee = (id: number) => {
    const emp = employee.find((emp) => emp.id === id);
    if (emp) {
      setCreateModel(emp);
      setIsDialogOpen(true);
    }
  }

  return {
    employee,
    setEmployee,
    createModel,
    setCreateModel,
    handleSubmit,
    isDialogOpen,
    setIsDialogOpen,
    onEditEmployee,
  };
}
