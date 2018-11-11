import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v1';

export class Authenticator {
    static readonly Handle = 'authenticator';

    sign(user: string) {
        return jwt.sign(
            {
                sub: user,
                token_type: 'access_token',
                iss: process.env.TOKEN_ISS,
                jti: uuid(),
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: `${process.env.TOKEN_ACCESS_EXPIRES_IN}s`,
            },
        );
    }

    verify(token: string) {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    }

    build(user: string) {
        return {
            accessToken: this.sign(user),
            expiresIn: process.env.TOKEN_ACCESS_EXPIRES_IN,
        };
    }

    hash(password: string, salt: string): string {
        return crypto
            .createHmac('sha512', salt)
            .update(password)
            .digest('hex');
    }
}
