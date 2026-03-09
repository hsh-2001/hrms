export interface ICreatePayrollComponentRequest {
    id?: number;
    name: string;
    description: string;
    component_type: "earning" | "deduction" | string;
    calculation_type: "fixed" | "percentage" | string;
}

export interface IGetPayrollComponentResponse {
    id: number;
    name: string;
    description: string;
    component_type: "earning" | "deduction" | string;
    calculation_type: "fixed" | "percentage" | string;
}


export interface IAssignPayrollComponentToEmployeeRequest {
    employee_id: string;
    component_id: number;
    value: number | string;
}

export interface IGetEmployeePayrollComponentResponse {
    id: number;
    employee_id: string;
    component_id: number;
    value: number | string;
}