import React, { useEffect } from "react";
import useEmployees from "../../hooks/useEmployees";
import BaseHeader from "../../components/shares/BaseHeader";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import BaseDialog from "../../components/shares/BaseDialog";
import MyInput from "../../components/shares/input/MyInput";
import usePayrollStructure from "../../hooks/payroll/usePayrollStructure";
import { Edit } from "lucide-react";
import type {
  IAssignPayrollComponentToEmployeeRequest,
  IGetPayrollComponentResponse,
} from "../../types/payroll/payrollStructure";
import MySelection from "../../components/shares/select/MySelection";
import type { GetEmployeesResponse } from "../../types/employees";

const SalaryStructurePage = () => {
  const { employee, getEmployees } = useEmployees();
  const {
    componentModel,
    setComponentModel,
    createPayrollComponent,
    isDialogVisible,
    setIsDialogVisible,
    getPayrollComponents,
    payrollComponents,
    onClickEditComponent,
    isEditing,
    onCloseDialog,
    assignFormVisible,
    setAssignFormVisible,
    assignModel,
    setAssignModel,
    onAssignComponentToEmployee,
    getEmployeePayrollComponents,
    employeePayrollComponents,
  } = usePayrollStructure();

  useEffect(() => {
    getEmployees();
    getPayrollComponents();
    getEmployeePayrollComponents();
  }, []);
  return (
    <div className="w-full">
      <BaseHeader headerTitle="Payroll Structure"></BaseHeader>
      <div className="w-full px-2 space-y-2">
        <div className="w-full p-2 rounded-md border border-gray-300 space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <span>Payroll Types</span>
            </div>
            <PrimaryButton
              name="Create Payroll Component"
              onClick={() => setIsDialogVisible(true)}
            />
          </div>
          {payrollComponents.length > 0 && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
              {payrollComponents.map((component) => (
                <div
                  key={component.name}
                  className="p-2 flex justify-between items-start rounded-md border border-green-500 mb-2"
                >
                  <div>
                    <h3 className="text-md font-medium">{component.name}</h3>
                    <p>{component.description}</p>
                  </div>
                  <button onClick={() => onClickEditComponent(component)}>
                    <Edit className="text-gray-500" size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full p-2 rounded-md border border-gray-300 space-y-2">
          <div className="flex justify-between">
            <div>
              <span>Employees and Salary component</span>
            </div>
            <PrimaryButton
              name="Assign Employee's Salary Component"
              onClick={() => setAssignFormVisible(true)}
            />
          </div>
          <div>
            {employeePayrollComponents.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">
                      Employee Name
                    </th>
                    <th className="border border-gray-300 p-2">
                      Component Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeePayrollComponents.map((item) => (
                    <tr key={item.employee_id + "-" + item.component_id}>
                      <td className="border border-gray-300 p-2">
                        {item.employee_id}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.component_id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <BaseDialog
        title={
          isEditing ? "Edit Payroll Component" : "Create Payroll Component"
        }
        isOpen={isDialogVisible}
        isCentered
        onClose={onCloseDialog}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPayrollComponent();
          }}
          className="grid gap-2 min-w-125"
        >
          <MyInput
            id="name"
            label="Name"
            type="text"
            value={componentModel.name}
            onChange={(e) =>
              setComponentModel({ ...componentModel, name: e.target.value })
            }
          />
          <MyInput
            id="description"
            label="Description"
            type="text"
            value={componentModel.description}
            onChange={(e) =>
              setComponentModel({
                ...componentModel,
                description: e.target.value,
              })
            }
          />
          <div className="flex justify-end">
            <PrimaryButton
              type="submit"
              name={isEditing ? "Update" : "Create"}
            />
          </div>
        </form>
      </BaseDialog>

      <AssignComponentToEmployeeDialog
        isOpen={assignFormVisible}
        onClose={() => setAssignFormVisible(false)}
        model={assignModel}
        setModel={setAssignModel}
        components={payrollComponents}
        employees={employee}
        onSubmit={onAssignComponentToEmployee}
      />
    </div>
  );
};

export default SalaryStructurePage;

interface IAssignComponentToEmployeeDialog {
  isOpen: boolean;
  onClose: () => void;
  model: IAssignPayrollComponentToEmployeeRequest;
  setModel: React.Dispatch<React.SetStateAction<IAssignPayrollComponentToEmployeeRequest>>;
  components: IGetPayrollComponentResponse[];
  employees: GetEmployeesResponse[];
  onSubmit: () => void;
}

const AssignComponentToEmployeeDialog = ({
  isOpen,
  onClose,
  model,
  setModel,
  components,
  employees,
  onSubmit,
}: IAssignComponentToEmployeeDialog) => {
  return (
    <BaseDialog
      title="Assign Component to Employee"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="grid gap-2 min-w-125"
      >
        <MySelection
          id="employee_id"
          value={model.employee_id}
          onChange={(e) => setModel({ ...model, employee_id: e.target.value })}
          options={employees.map((employee) => ({
            label: employee.first_name + " " + employee.last_name,
            value: employee.id,
          }))}
          label="Select Employee"
        />
        <MySelection
          id="component_id"
          value={model.component_id}
          onChange={(e) =>
            setModel({ ...model, component_id: Number(e.target.value) })
          }
          options={components.map((component) => ({
            label: component.name,
            value: component.id,
          }))}
          label="Select Component"
        />
        <MyInput
          id="value"
          label="Value"
          type="number"
          value={model.value}
          onChange={(e) =>
            setModel({ ...model, value: Number(e.target.value) })
          }
        />
        <div className="flex justify-end">
          <PrimaryButton type="submit" name="Assign" />
        </div>
      </form>
    </BaseDialog>
  );
};
