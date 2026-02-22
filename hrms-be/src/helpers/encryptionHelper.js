import bcrypt from 'bcrypt';

const passwordHash = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

export default {
    passwordHash,
    verifyPassword,
}