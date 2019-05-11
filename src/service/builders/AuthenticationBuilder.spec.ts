import InjectionContainer from 'typedi';

import { Authentication } from '../../entity/Authentication';
import { AuthenticationBuilder } from './AuthenticationBuilder';

describe('AuthenticationBuilder', () => {
    let builder: AuthenticationBuilder;
    beforeEach(() => {
        builder = new AuthenticationBuilder();
    });

    it('should be a typedi service', () => {
        expect(InjectionContainer.get(AuthenticationBuilder)).toBeInstanceOf(
            AuthenticationBuilder,
        );
    });

    describe('when calling create', () => {
        let result: Authentication;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a Authentication', () => {
            expect(result).toBeInstanceOf(Authentication);
        });
    });

    describe('when calling setPassword', () => {
        const password = 'Abcd123';
        let result: AuthenticationBuilder;
        beforeEach(() => {
            result = builder.setPassword(password);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Authentication;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Authentication', () => {
                expect(result).toBeInstanceOf(Authentication);
            });

            it('then should set the Authentications password', () => {
                expect(result.password).toBe(password);
            });
        });
    });
});
