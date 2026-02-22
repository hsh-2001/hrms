interface IBaseResponse<T> {
    status: number;
    message: string;
    data: T;
}

export type ApiResponse<T> = IBaseResponse<T>;