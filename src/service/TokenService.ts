import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import uuid from 'uuid/v1';

import { User } from '../entity/User';
import { Tokens } from '../resolvers/types/Authentication';

export interface IClaims {
    [c: string]: string;
}

@Service(TokenService.HANDLE)
export class TokenService {
    static readonly HANDLE = 'token.service';

    tokens(user: User): Tokens {
        const accessTokenId = uuid();
        return {
            accessToken: this.accessToken(user, accessTokenId),
            expiresIn: process.env.TOKEN_ACCESS_EXPIRES_IN,
            refreshToken: this.refreshToken(accessTokenId),
        };
    }

    verify(token: string): IClaims {
        return jwt.verify(token, process.env.TOKEN_SECRET) as IClaims;
    }

    private sign(claims: object, expiry: number | string, jti: string = uuid()): string {
        return jwt.sign({ ...claims, jti }, process.env.TOKEN_SECRET, {
            expiresIn: `${expiry}s`,
        });
    }

    private accessToken(user: User, accessTokenId: string) {
        return this.sign(
            {
                account_type: user.role,
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                sub: user.id,
                token_type: 'access_token',
            },
            process.env.TOKEN_ACCESS_EXPIRES_IN,
            accessTokenId,
        );
    }

    private refreshToken(accessTokenId: string) {
        return this.sign(
            {
                sub: accessTokenId,
                token_type: 'refresh_token',
            },
            process.env.TOKEN_ACCESS_EXPIRES_IN,
        );
    }
}
