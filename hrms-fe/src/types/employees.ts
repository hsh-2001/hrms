export interface IEmployee {
    id: number;
    name: string;
    email: string;
    position: string;
    department: string;
    dateOfJoining: string;
    status: "active" | "inactive";
}

export type ICreateEmployee = Omit<IEmployee, "id">;