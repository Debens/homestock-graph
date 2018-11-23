import Container from 'typedi';

import { mockEnvironment } from '../../test/mock-env';
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

        const tokens = service.tokens(user);

        it('then should get the expiry from the environment', () => {
            expect(tokens.expiresIn).toEqual(process.env.TOKEN_ACCESS_EXPIRES_IN);
        });

        describe('when decoding tokens', () => {
            describe('access_token', () => {
                const claims = service.verify(tokens.accessToken);

                it('then should have a id', () => {
                    expect(claims.jti).toBeDefined();
                });

                it('then should be tied to the user', () => {
                    expect(claims.sub).toBe(user.id);
                });

                it('then should have the correct token type', () => {
                    expect(claims.token_type).toEqual('access_token');
                });
            });

            describe('refresh_token', () => {
                const claims = service.verify(tokens.refreshToken);
                const accessClaims = service.verify(tokens.accessToken);

                it('then should have a id', () => {
                    expect(claims.jti).toBeDefined();
                });

                it('then should be tied to the access token', () => {
                    expect(claims.sub).toBe(accessClaims.jti);
                });

                it('then should have the correct token type', () => {
                    expect(claims.token_type).toEqual('refresh_token');
                });
            });
        });
    });
});
