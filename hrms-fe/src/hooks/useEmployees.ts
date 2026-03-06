import { useRef, useState } from "react";
import { GetEmployeesResponse, type ICreateEmployee } from "../types/employees";
import companyApi from "../lib/companyApi";

export default function useEmployees() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employees, setEmployees] = useState<GetEmployeesResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  const [createModel, setCreateModel] = useState<ICreateEmployee>({
    username: "",
    password: "",
    phone: "",
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    department: "",
    date_of_joining: "",
  });

  const getEmployees = async (page = 1, limit = 10) => {
    try {
      const response = await companyApi.getAllEmployees({ page, limit });
      if (response) {
        setEmployees(response.data.map((emp) => new GetEmployeesResponse(emp)));
        setCurrentPage(response.data[0]?.page || 1);
        setTotalPages(response.data[0]?.total_pages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const onPageChange = (page: number, limit = 10) => {
    setCurrentPage(page);
    getEmployees(page, limit);
  };

  const editEmployeeId = useRef<string | null>(null);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = isEdit && editEmployeeId.current ? await companyApi.editEmployee({ ...createModel, id: editEmployeeId.current }) : await companyApi.createEmployee(createModel);
      if (response.isSuccess) {
        await getEmployees(currentPage);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create or edit employee:", error);
    }
  };

  const onEditEmployee = (id: string) => {
    const emp = employees.find((emp) => emp.id === id);
    editEmployeeId.current = id;
    if (emp) {
      setCreateModel({
        username: emp.username,
        password: "",
        phone: emp.phone,
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        position: emp.position,
        department: emp.department,
        date_of_joining: emp.date_of_joining.split('T')[0],
      });
      setIsEdit(true);
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
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
    onPageChange,
    isEdit,
    setIsEdit,
  };
}
