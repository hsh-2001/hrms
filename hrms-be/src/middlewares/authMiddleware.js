import tokenHelper from "../helpers/tokenHelper.js";

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return BaseResponse.error(res, "Unauthorized: Authorization header missing", 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return BaseResponse.error(res, "Unauthorized: No token provided", 401);
    }

    try {
        const decoded = await tokenHelper.verifyToken(token);
        req.user = {
            id: decoded.id,
            username: decoded.un,
            email: decoded.e,
            phone: decoded.p,
            company_id: decoded.cd,
        };
        next();
    } catch (err) {
        return BaseResponse.error(res, "Invalid token", 401);
    }
}
