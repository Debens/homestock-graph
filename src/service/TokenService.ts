import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import uuid from 'uuid/v1';

import { Session } from '../entity/Session';
import { User } from '../entity/User';
import { Tokens } from '../resolvers/types/Authentication';
import { getTokenExpiry } from '../utils/tokens';

export interface IClaims {
    [c: string]: string;
}

@Service(TokenService.HANDLE)
export class TokenService {
    static readonly HANDLE = 'token.service';

    tokens(session: Session, user: User): Tokens {
        return {
            accessToken: this.accessToken(session, user),
            expiresIn: session.expiry.getSeconds(),
            refreshToken: this.refreshToken(session),
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

    private accessToken(session: Session, user: User) {
        return this.sign(
            {
                account_type: user.role,
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                sub: session.id,
                token_type: 'access_token',
                user: user.id,
            },
            process.env.TOKEN_ACCESS_EXPIRES_IN,
        );
    }

    private refreshToken(session: Session) {
        return this.sign(
            {
                sub: session.id,
                token_type: 'refresh_token',
            },
            process.env.TOKEN_ACCESS_EXPIRES_IN,
        );
    }
}
