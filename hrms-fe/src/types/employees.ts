import dateTimeFormat from "../lib/dateTimeFormat";
import type { IPagination } from "./base";

export interface IEmployee {
    id: string;
    first_name: string;
    last_name: string;
    username: string
    email: string;
    phone: string;
    position: string;
    department: string;
    date_of_joining: string;
    is_active?: boolean;
}

export type ICreateEmployee = Omit<IEmployee, "id" | "is_active"> & {
    password: string;
    phone: string;
};

export interface IGetEmployeesResponse  extends IEmployee, IPagination {
    row_number: number;
    created_at: string;
    updated_at: string;
}

export class GetEmployeesResponse implements IGetEmployeesResponse {
    row_number: number;
    id: string;
    first_name: string;
    last_name: string;
    username: string
    email: string;
    phone: string;
    position: string;
    department: string;
    date_of_joining: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    total_pages: number;
    limit: number;
    page: number;

    constructor(init: IGetEmployeesResponse) {
        this.id = init.id;
        this.first_name = init.first_name;
        this.last_name = init.last_name;
        this.username = init.username;
        this.email = init.email;
        this.position = init.position;
        this.department = init.department;
        this.date_of_joining = init.date_of_joining;
        this.is_active = init.is_active || false;
        this.created_at = init.created_at;
        this.updated_at = init.updated_at; 
        this.total_pages = init.total_pages ;
        this.limit = init.limit;
        this.page = init.page;
        this.row_number = init.row_number;
        this.phone = init.phone;
    }

    get dateOfJoiningForDisplay(): string {
        return dateTimeFormat.dateFormat(this.date_of_joining) || "N/A";
    }

    get getStatusForDisplay(): string {
        return this.is_active ? "Active" : "Inactive";
    }
}