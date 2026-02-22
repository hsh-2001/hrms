class BaseResponse {
    constructor(statusCode, message, data = undefined) {
        this.status = statusCode;
        this.message = message;
        this.data = data;
    }

    static success(res, data, message = 'Success') {
        return res.status(200).json(new BaseResponse(200, message, data));
    }

    static error (res, message = 'Error', statusCode = 500) {
        return res.status(statusCode).json(new BaseResponse(statusCode, message));
    }
}

export default BaseResponse;