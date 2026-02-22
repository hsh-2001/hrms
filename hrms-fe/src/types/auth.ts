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
    company_name: string;
}

export interface IAuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}