interface IBaseResponse<T = undefined> {
    status: number;
    message: string;
    data: T;
}

export type IApiResponse<T = undefined> = IBaseResponse<T>;

export class BaseResponse<T = undefined> implements IBaseResponse<T> {
    status: number;
    message: string;
    data: T;
    constructor(status: number, message: string, data: T) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    get isSuccess(): boolean {
        return this.status === 200;
    }
}

export const getResponse = <T>(response: IApiResponse<T>): BaseResponse<T> => {
    return new BaseResponse<T>(response.status, response.message, response.data);
}
