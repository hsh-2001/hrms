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
import useDevice from "../../hooks/useDevice";
import Pagination from "../../components/Pagination";
import useDepartment from "../../hooks/useDepartment";
import type { IGetDepartmentResponse } from "../../types/department";
import usePosition from "../../hooks/usePosition";
import type { IGetPositionsResponse } from "../../types/position";
import usePermission from "../../hooks/usePermission";

export default function Employees() {
  const {
    departments,
    getAllDepartments,
  } = useDepartment();
  const { isCreateable } = usePermission("employees/employee-list");
  const {
    positions,
    getPositions,
  } = usePosition();
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
  } = useEmployees();
  const { isMobile } = useDevice();

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
        {
          isCreateable ? (
            <PrimaryButton
              name="Add Employee"
              onClick={() => setIsDialogOpen(true)}
            />
          ) : null
        }
      </BaseHeader>
      <div className={`px-2 ${isMobile ? "overflow-x-auto max-w-screen px-2 h-" : ""}`}>
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
              <th>Actions</th>
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
                <td>{emp.status}</td>
                <td>
                  <button
                    onClick={() => onEditEmployee(emp.id)}
                    className="cursor-pointer"
                  >
                    <Edit size={14} className="text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-2">
        <Pagination
          totalItems={totalPages}
          itemsPerPage={1}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
      <BaseDialog
        isOpen={isDialogOpen}
        isCentered
        title="Add new employee"
        onClose={() => setIsDialogOpen(false)}
        closeOnOverlayClick={false}
      >
        <div className="min-w-125">
          <CreateEditEmployee
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
}

const CreateEditEmployee = ({
  model,
  setModel,
  handleSubmit,
  setIsDialogOpen,
  departments,
  positions,
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
    { id: "password", required: true, type: "password" },
    { id: "phone", required: true },
    { id: "first_name", required: true },
    { id: "last_name", required: true },
    { id: "email", required: true },
    { id: "date_of_joining", type: "date" },
  ];
  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      {fields.map((field) => (
        <MyInput
          key={field.id}
          id={field.id}
          type={field.type || "text"}
          required={field.required || false}
          value={model[field.id]}
          onChange={(e) => handleChange(field.id, e.target.value)}
        />
      ))}
      <MySelection
        id="department"
        value={model.department}
        onChange={(e) => handleChange("department", e.target.value)}
        options={departments.map((dept) => ({
          label: dept.name,
          value: dept.name,
        }))}
      />
      <MySelection
        id="position"
        value={model.position}
        onChange={(e) => handleChange("position", e.target.value)}
        options={positions.map((pos) => ({
          label: pos.title,
          value: pos.title,
        }))}
      />
      <MySelection
        id="status"
        value={model.status}
        onChange={(e) =>
          setModel({
            ...model,
            status: e.target.value as "active" | "inactive",
          })
        }
        options={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
      />
      <div className="flex justify-end gap-2">
        <InfoButton onClick={() => setIsDialogOpen(false)} />
        <PrimaryButton type="submit" />
      </div>
    </form>
  );
};
