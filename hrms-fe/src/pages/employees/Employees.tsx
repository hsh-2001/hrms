import BaseDialog from "../../components/shares/BaseDialog";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import useEmployees from "../../hooks/useEmployees";
import MyInput from "../../components/shares/input/MyInput";
import MySelection from "../../components/shares/select/MySelection";
import InfoButton from "../../components/shares/button/InfoButton";
import type { ICreateEmployee } from "../../types/employees";
import { Edit } from "lucide-react";
import BaseHeader from "../../components/shares/BaseHeader";
import { useEffect, useRef } from "react";
import Pagination from "../../components/Pagination";
import useDepartment from "../../hooks/useDepartment";
import type { IGetDepartmentResponse } from "../../types/department";
import usePosition from "../../hooks/usePosition";
import type { IGetPositionsResponse } from "../../types/position";
import usePermission from "../../hooks/usePermission";
import { Tag } from "antd";

export default function Employees() {
  const { departments, getAllDepartments } = useDepartment();

  const { isEditable, isCreateable } = usePermission("employees/employee-list");

  const { positions, getPositions } = usePosition();
  const {
    employee,
    getEmployees,
    createModel,
    setCreateModel,
    handleSubmit,
    isDialogOpen,
    setIsDialogOpen,
    onEditEmployee,
    currentPage,
    totalPages,
    onPageChange,
    isEdit,
    setIsEdit,
  } = useEmployees();

  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      getEmployees();
      getAllDepartments();
      getPositions();
      isCalled.current = true;
    }
  }, [currentPage, getEmployees, totalPages]);

  return (
    <div className="w-full">
      <BaseHeader headerTitle="Employee List">
        {isCreateable ? (
          <PrimaryButton
            name="Add Employee"
            onClick={() => setIsDialogOpen(true)}
          />
        ) : null}
      </BaseHeader>
      <div className="table-scroll px-2">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Status</th>
              {isEditable ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {employee?.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.row_number}</td>
                <td>{`${emp.first_name} ${emp.last_name}`}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.dateOfJoiningForDisplay}</td>
                <td>
                  <Tag color={emp.is_active ? "green" : "red"}>{emp.getStatusForDisplay}</Tag>
                </td>
                {isEditable ? (
                  <td>
                    <button
                      onClick={() => {
                        onEditEmployee(emp.id);
                        setIsEdit(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Edit size={14} className="text-gray-500" />
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-2">
        <Pagination
          total_page={totalPages}
          page={currentPage}
          onPageChange={onPageChange}
        />
      </div>
      <BaseDialog
        isOpen={isDialogOpen}
        isCentered
        title={isEdit ? "Edit Employee" : "Add new employee"}
        onClose={() => setIsDialogOpen(false)}
        closeOnOverlayClick={false}
      >
        <div className="min-w-125">
          <CreateEditEmployee
            isEdit={isEdit}
            model={createModel}
            departments={departments}
            positions={positions}
            setModel={setCreateModel}
            handleSubmit={handleSubmit}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </BaseDialog>
    </div>
  );
}

interface CreateEditEmployeeProps {
  model: ICreateEmployee;
  departments: IGetDepartmentResponse[];
  positions: IGetPositionsResponse[];
  setModel: React.Dispatch<React.SetStateAction<ICreateEmployee>>;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
}

const CreateEditEmployee = ({
  model,
  setModel,
  handleSubmit,
  setIsDialogOpen,
  departments,
  positions,
  isEdit,
}: CreateEditEmployeeProps) => {
  const handleChange = <K extends keyof ICreateEmployee>(
    field: K,
    value: ICreateEmployee[K],
  ) => {
    setModel((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  type EmployeeField = {
    id: keyof ICreateEmployee;
    required?: boolean;
    type?: React.HTMLInputTypeAttribute;
  };

  const fields: EmployeeField[] = [
    { id: "username", required: true },
    { id: "password", required: isEdit ? false : true, type: "password" },
    { id: "phone", required: true },
    { id: "first_name", required: true },
    { id: "last_name", required: false },
    { id: "email", required: true },
    { id: "date_of_joining", type: "date" },
  ];

  const getDepartmentId = (name: string) => {
    const dept = departments.find((d) => d.name === name);
    return dept ? dept.id : "";
  }
  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      {fields.map((field) => (
        <MyInput
          key={field.id}
          id={field.id}
          type={field.type || "text"}
          required={field.required || false}
          value={model[field.id] ?? ""}
          onChange={(e) => handleChange(field.id, e.target.value)}
        />
      ))}
      <MySelection
        id="department"
        value={model.department}
        onChange={(e) => handleChange("department", e.target.value)}
        options={departments.map((dept) => ({
          ...{label: "", value: ""},
          label: dept.name,
          value: dept.name,
        }))}
      />
      <MySelection
        id="position"
        value={model.position}
        onChange={(e) => handleChange("position", e.target.value)}
        disabled={!model.department}
        options={positions.filter((v) => v.department_id === getDepartmentId(model.department)).map((pos) => ({
          ...{label: "", value: ""},
          label: pos.title,
          value: pos.title,
        }))}
      />
      <div className="flex justify-end gap-2">
        <InfoButton name="Cancel" onClick={() => setIsDialogOpen(false)} />
        <PrimaryButton
          name={isEdit ? "Save Changes" : "Create Employee"}
          type="submit"
        />
      </div>
    </form>
  );
};
