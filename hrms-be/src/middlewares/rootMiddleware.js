import tokenHelper from "../helpers/tokenHelper.js";
import BaseResponse from "../helpers/baseResponse.js";

const rootMiddleware =  async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return BaseResponse.error(res, "Unauthorized: No token provided", 401);
    }
    const decoded = await tokenHelper.verifyToken(token);
    req.user = {
        id: decoded.id,
        username: decoded.un,
        email: decoded.e,
        phone: decoded.p,
        company_id: decoded.cd,
    };
    if (req.user.company_id !== 0) {
        return BaseResponse.error(res, "Forbidden: Access is denied", 403);
    }
    next();
}

export default rootMiddleware;