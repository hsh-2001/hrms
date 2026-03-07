export interface IBaseUser {
    id: number;
    role_id?: number;
    username: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
}

export interface ICompanyUser extends IBaseUser {
    is_active: boolean;
    role: string;
    company_id: number;
    company_name: string;
    total_page: number;
    page: number;
    limit: number;
}