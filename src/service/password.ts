import crypto from 'crypto';

export const createSalt = (length: number = 16): string => {
    return crypto
        .randomBytes(Math.floor(length / 2))
        .toString('hex')
        .slice(0, length);
};

export const hashPassword = (password: string, salt: string): string => {
    return crypto
        .createHmac('sha512', salt)
        .update(password)
        .digest('hex');
};
