import cookieHelper from '../helpers/cookieHelper.js';
import encryptionHelper from '../helpers/encryptionHelper.js';
import tokenHelper from '../helpers/tokenHelper.js';
import userRepository from '../repositories/userRepository.js';

const register = async (user) => {
    const password = await encryptionHelper.passwordHash(user.password);
    user.password = password;
    return await userRepository.register(user);
}

const login = async (res, user) => {
    const existingUser = await userRepository.login(user);
    if (!existingUser) {
        throw new Error('User not found');
    }
    const isPasswordValid = await encryptionHelper.verifyPassword(user.password, existingUser.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = await tokenHelper.generateToken({...existingUser});
    const refreshToken = await tokenHelper.generateRefreshToken({...existingUser});
    cookieHelper.setCookie(res, 'token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    cookieHelper.setCookie(res, 'rt', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    const userDetail = await userRepository.getUserDetail(existingUser.id);
    return { ...userDetail, token };
}

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

const getUserByCompanyId = async (companyId) => {
    return await userRepository.getUserByCompanyId(companyId);
}

export default {
    register,
    login,
    getAllUsers,
    getUserByCompanyId,
}