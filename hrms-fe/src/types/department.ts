export interface IDepartment {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  is_default: boolean;
  description?: string;
  company_id: number;
  manager_id?: string;
}

export type ICreateDepartmentRequest = Omit<IDepartment, "id">;

export interface IGetDepartmentResponse extends IDepartment {
    created_at: string;
    updated_at: string;
}