import BaseDialog from "../components/shares/BaseDialog";
import PrimaryButton from "../components/shares/button/PrimaryButton";
import useEmployees from "../hooks/useEmployees";
import MyInput from "../components/shares/input/MyInput";
import MySelection from "../components/shares/select/MySelection";
import InfoButton from "../components/shares/button/InfoButton";
import type { ICreateEmployee } from "../types/employees";

export default function Employees() {
  const {
    employee,
    createModel,
    setCreateModel,
    handleSubmit,
    isDialogOpen,
    setIsDialogOpen,
    onEditEmployee,
  } = useEmployees();

  return (
    <div className="w-full">
      <div className="w-full p-4 bg-gray-100 rounded-md my-2 flex justify-between items-center">
        <div>
          <span className=" text-2xl">Employee List</span>
        </div>
        <PrimaryButton
          name="Add Employee"
          onClick={() => setIsDialogOpen(true)}
        />
      </div>
      <table className="w-full">
        <thead className="bg-gray-200 p-2">
          <tr>
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
          {employee.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.dateOfJoining}</td>
              <td>{emp.status}</td>
              <td>
                <InfoButton
                  name="Edit"
                  onClick={() => onEditEmployee(emp.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <BaseDialog
        isOpen={isDialogOpen}
        isCentered
        onClose={() => setIsDialogOpen(false)}
        closeOnOverlayClick={false}
      >
        <div className="min-w-125">
          <CreateEditEmployee
            model={createModel}
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
  setModel: React.Dispatch<React.SetStateAction<ICreateEmployee>>;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEditEmployee = ({
  model,
  setModel,
  handleSubmit,
  setIsDialogOpen,
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
    { id: "name", required: true },
    { id: "email", required: true },
    { id: "position" },
    { id: "department" },
    { id: "dateOfJoining", type: "date" },
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
