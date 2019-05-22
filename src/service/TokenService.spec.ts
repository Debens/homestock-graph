import Container from 'typedi';

import { mockEnvironment } from '../../test/mock-env';
import { Session } from '../entity/Session';
import { User } from '../entity/User';
import { TokenService } from './TokenService';

mockEnvironment({
    TOKEN_ACCESS_EXPIRES_IN: '180',
    TOKEN_SECRET: 'secret',
});

describe('TokenService', () => {
    const service = new TokenService();

    it('should be a typedi service', () => {
        expect(Container.get(TokenService.HANDLE)).toBeInstanceOf(TokenService);
    });

    describe('when creating tokens for a user', () => {
        const user = new User();
        const session = new Session();
        session.expiry = new Date();

        const tokens = service.tokens(session, user);

        it('then should get the expiry from the session', () => {
            expect(tokens.expiresIn).toEqual(session.expiry.getSeconds());
        });

        describe('when decoding tokens', () => {
            describe('access_token', () => {
                const claims = service.verify(tokens.accessToken);

                it('then should have a id', () => {
                    expect(claims.jti).toBeDefined();
                });

                it('then should be tied to the session', () => {
                    expect(claims.sub).toBe(session.id);
                });

                it('then should have the correct token type', () => {
                    expect(claims.token_type).toEqual('access_token');
                });
            });

            describe('refresh_token', () => {
                const claims = service.verify(tokens.refreshToken);

                it('then should have a id', () => {
                    expect(claims.jti).toBeDefined();
                });

                it('then should be tied to the session', () => {
                    expect(claims.sub).toBe(session.id);
                });

                it('then should have the correct token type', () => {
                    expect(claims.token_type).toEqual('refresh_token');
                });
            });
        });
    });
});
