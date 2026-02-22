import jwt from "jsonwebtoken";

const generateToken = async (user) => {
    const payload = {
        id: user.id,
        un: user.username,
        e: user.email,
        p: user.phone,
        cd: user.company_id,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}


const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

const generateRefreshToken = async (user) => {
    const payload = {
        id: user.id,
        un: user.username,
        e: user.email,
        p: user.phone,
        cd: user.company_id,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
}

export default {
    generateToken,
    generateRefreshToken,
    verifyToken,
} 