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
import InfoButton from "../../components/shares/button/InfoButton";

const DepartmentsPage = () => {
  const {
    departments,
    getAllDepartments,
    isModalOpen,
    setIsModalOpen,
    formModel,
    setFormModel,
    handleSubmit,
    onClickEdit,
    isEditMode,
    setIsEditMode,
  } = useDepartment();

  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      getAllDepartments();
      isCalled.current = true;
    }
  }, []);

  return (
    <div className="w-full">
      <BaseHeader headerTitle="Departments">
        <PrimaryButton
          name="Add Department"
          onClick={() => setIsModalOpen(true)}
        />
      </BaseHeader>
      {departments?.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 max-h-[85%] overflow-y-auto">
          {departments.map((department, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 hover:border-green-200 rounded-[20px] flex justify-between"
            >
              <div className="flex gap-4 items-center">
                <div className="flex items-center justify-center bg-green-500/10 rounded-[10px] w-12.5 h-12.5">
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
                  <Edit className="text-gray-500 cursor-pointer" size={14} onClick={() => onClickEdit(department)} />
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
        isEditMode={isEditMode}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setFormModel({
            name: "",
            code: "",
            description: "",
            is_active: true,
            is_default: false,
            manager_id: "550e8400-e29b-41d4-a716-446655440000",
            company_id: 0,
          });
        }}
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
  isEditMode?: boolean;
  onClose: () => void;
  formModel: ICreateDepartmentRequest;
  setModel: React.Dispatch<React.SetStateAction<ICreateDepartmentRequest>>;
  onSubmit?: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

const CreateEditDepartmentModal = ({
  isOpen,
  isEditMode,
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
        title={isEditMode ? "Edit Department" : "Create Department"}
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
              disabled={isEditMode && formModel.is_default && ["name", "code"].includes(field.name)}
            />
          ))}
          <div className="flex justify-end gap-2">
            <InfoButton name="Cancel" onClick={onClose} />
            <PrimaryButton name="Submit" type="submit" />
          </div>
        </form>
      </BaseDialog>
    </div>
  );
};
