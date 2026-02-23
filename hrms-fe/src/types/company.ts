export interface ICompanyAccount {
    id?: number;
    name: string;
    address: string;
    phone: string;
    email: string;
}

export interface IGetCompanyAccountResponse  extends ICompanyAccount {
    id: number;
    login_name: string;
    total_users: number;
    total_employees: number;
    created_at: string;
    updated_at: string;
}

export interface ICreateCompanyAccountRequest extends ICompanyAccount {
    username: string;
    password: string;
}