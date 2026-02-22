export interface IBaseUser {
    id: number;
    username: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
}

export interface ICompanyUser extends IBaseUser {
    role: string;
    company_id: number;
    company_name: string;
}