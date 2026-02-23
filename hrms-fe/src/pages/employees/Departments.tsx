import { useEffect, useRef } from "react";
import useDepartment from "../../hooks/useDepartment";
import BaseHeader from "../../components/shares/BaseHeader";
import { Tag } from "antd";
import { Edit, Ellipsis } from "lucide-react";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import BaseDialog from "../../components/shares/BaseDialog";
import type { ICreateDepartmentRequest } from "../../types/department";
import MyInput from "../../components/shares/input/MyInput";
import type { IInputField } from "../../types/form";

const DepartmentsPage = () => {
  const {
    departments,
    getAllDepartments,
    isModalOpen,
    setIsModalOpen,
    formModel,
    setFormModel,
    handleSubmit,
  } = useDepartment();

  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      getAllDepartments();
      isCalled.current = true;
    }
  }, []);

  return (
    <div className="w-full h-full">
      <BaseHeader headerTitle="Departments">
        <PrimaryButton
          name="Add Department"
          onClick={() => setIsModalOpen(true)}
        />
      </BaseHeader>
      {departments.length ? (
        <div className="grid grid-cols-1 items-center gap-2 max-h-[85%] overflow-y-auto">
          {departments.map((department, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 hover:border-green-200 rounded-md flex justify-between"
            >
              <div className="flex gap-4 items-center">
                <div className="flex items-center justify-center bg-black/10 shadow rounded-sm w-12.5 h-12.5">
                  <span>{department.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <div className="text-lg flex gap-2 items-center">
                    {department.name}
                    <Tag color="green">
                      <span className="text-[10px]">
                        {department.code}
                      </span>
                    </Tag>
                  </div>
                  <div className="text-[12px] text-gray-500">Employee: 100</div>
                </div>
              </div>
              <div>
                <Tag color="blue" className="text-sm">
                  <span className="text-[12px]">
                    {department.is_active ? "Active" : "Inactive"}
                  </span>
                </Tag>
                <div className="flex p-2 gap-2 items-center">
                  <Edit className="text-gray-500 cursor-pointer" size={14} />
                  <Ellipsis
                    className="text-gray-500 cursor-pointer"
                    size={14}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          No departments available
        </div>
      )}
      <CreateEditDepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formModel={formModel}
        setModel={setFormModel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default DepartmentsPage;

interface ICreateEditDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  formModel: ICreateDepartmentRequest;
  setModel: React.Dispatch<React.SetStateAction<ICreateDepartmentRequest>>;
  onSubmit?: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

const CreateEditDepartmentModal = ({
  isOpen,
  onClose,
  formModel,
  setModel,
  onSubmit,
}: ICreateEditDepartmentModalProps) => {
  const inputFields: IInputField[] = [
    { name: "name", label: "Department Name", type: "text", required: true },
    { name: "code", label: "Department Code", type: "text", required: true },
    { name: "description", label: "Description", type: "text" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setModel((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div>
      <BaseDialog
        isOpen={isOpen}
        isCentered
        title="Create Department"
        onClose={onClose}
      >
        <form onSubmit={onSubmit} className="min-w-100 grid grid-cols-1 gap-2">
          {inputFields.map((field) => (
            <MyInput
              key={field.name}
              id={field.name}
              label={field.label}
              value={(formModel[field.name as keyof ICreateDepartmentRequest] as string) || ""}
              onChange={handleChange}
              required={field.required}
            />
          ))}
          <div className="flex justify-end">
            <PrimaryButton name="Submit" type="submit" />
          </div>
        </form>
      </BaseDialog>
    </div>
  );
};
