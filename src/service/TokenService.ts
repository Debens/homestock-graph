import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import uuid from 'uuid/v1';

import { User } from '../entity/User';
import { Tokens } from '../resolvers/types/Authentication';

export type IClaims = { [c: string]: string };

@Service(TokenService.HANDLE)
export class TokenService {
    public static readonly HANDLE = 'token.service';

    tokens(user: User): Tokens {
        const accessTokenId = uuid();
        return {
            accessToken: this.accessToken(user, accessTokenId),
            refreshToken: this.refreshToken(accessTokenId),
            expiresIn: process.env.TOKEN_ACCESS_EXPIRES_IN,
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
                sub: user.id,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                account_type: user.role,
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
