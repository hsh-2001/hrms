export interface IEmployee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    department: string;
    date_of_joining: string;
    status: "active" | "inactive";
}

export type ICreateEmployee = Omit<IEmployee, "id">;

export interface IGetEmployeesResponse  extends IEmployee  {
    created_at: string;
    updated_at: string;
}