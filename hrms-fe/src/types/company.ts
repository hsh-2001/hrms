export interface ICompanyAccount {
    name: string;
    address: string;
    phone: string;
    email: string;
}

export interface IGetCompanyAccountResponse  extends ICompanyAccount {
    id: number;
    total_users: number;
    total_employees: number;
    created_at: string;
    updated_at: string;
}

export interface ICreateCompanyAccountRequest extends ICompanyAccount {
    username: string;
    password: string;
}