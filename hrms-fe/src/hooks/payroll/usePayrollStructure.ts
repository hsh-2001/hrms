import { useState } from "react";
import type { IAssignPayrollComponentToEmployeeRequest, ICreatePayrollComponentRequest, IGetEmployeePayrollComponentResponse, IGetPayrollComponentResponse } from "../../types/payroll/payrollStructure";
import payrollApi from "../../lib/payrollApi";

export default function usePayrollStructure() {
    const [componentModel, setComponentModel] = useState<ICreatePayrollComponentRequest>({
        name: "",
        description: "",
        component_type: "earning",
        calculation_type: "fixed",
    });
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [payrollComponents, setPayrollComponents] = useState<IGetPayrollComponentResponse[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    const [assignFormVisible, setAssignFormVisible] = useState(false);
    const [assignModel, setAssignModel] = useState<IAssignPayrollComponentToEmployeeRequest>({
        employee_id: "",
        component_id: 0,
        value: "",
    });

    const [employeePayrollComponents, setEmployeePayrollComponents] = useState<IGetEmployeePayrollComponentResponse[]>([]);
    
    const createPayrollComponent = async () => {
        try {
            const response = await payrollApi.createPayrollComponent(componentModel);
            if (response.isSuccess) {
                getPayrollComponents();
                setIsDialogVisible(false);
            }
        } catch (error) {
            console.error("Error creating payroll component:", error);
            throw error;
        }
    };

    const getPayrollComponents = async () => {
        try {
            const response = await payrollApi.getPayrollComponent();
            if (response.isSuccess) {
                setPayrollComponents(response.data);
            }
        } catch (error) {
            console.error("Error fetching payroll components:", error);
        }
    };

    const onClickEditComponent = (component: ICreatePayrollComponentRequest) => {
        setIsEditing(true);
        setComponentModel(component);
        setIsDialogVisible(true);
    }

    const getEmployeePayrollComponents = async () => {
        try {
            const response = await payrollApi.getAllEmployeePayrollComponents();
            if (response.isSuccess) {
                setEmployeePayrollComponents(response.data);
            }
        } catch (error) {
            console.error("Error fetching employee payroll components:", error);
        }
    };

    const onAssignComponentToEmployee = async () => {
        try {
            const response = await payrollApi.upSertEmployeePayrollComponent(assignModel);
            if (response.isSuccess) {
                setAssignFormVisible(false);
                getEmployeePayrollComponents();
            }
        } catch (error) {
            console.error("Error assigning payroll component to employee:", error);
            throw error;
        }
    };

    const onCloseDialog = () => {
        setIsEditing(false);
        setComponentModel({
            name: "",
            description: "",
            component_type: "earning",
            calculation_type: "fixed",
        });
        setIsDialogVisible(false);
    };

    return {
        componentModel,
        setComponentModel,
        createPayrollComponent,
        isDialogVisible,
        setIsDialogVisible,
        payrollComponents,
        setPayrollComponents,
        getPayrollComponents,
        onClickEditComponent,
        isEditing,
        onCloseDialog,
        assignFormVisible,
        setAssignFormVisible,
        assignModel,
        setAssignModel,
        onAssignComponentToEmployee,
        employeePayrollComponents,
        getEmployeePayrollComponents,
    };
};