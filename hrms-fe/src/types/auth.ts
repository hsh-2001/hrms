export interface ILoginRequest {
    username: string;
    password: string;
}

export interface IRegisterRequest extends ILoginRequest {
    confirmPassword: string;
    company_id: number;
    email: string;
    phone: string;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: string;
    company_id: number;
    employee_id: string;
    company_name: string;
    permissions: IPermission[];
}

export interface IAuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface IPermission {
    page: string;
    action: number;
    page_key: string;
}