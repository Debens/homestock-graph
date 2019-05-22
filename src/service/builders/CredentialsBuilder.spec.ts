import InjectionContainer from 'typedi';

import { Credentials } from '../../entity/Credentials';
import { CredentialsBuilder } from './CredentialsBuilder';

describe('CredentialsBuilder', () => {
    let builder: CredentialsBuilder;
    beforeEach(() => {
        builder = new CredentialsBuilder();
    });

    it('should be a typedi service', () => {
        expect(InjectionContainer.get(CredentialsBuilder)).toBeInstanceOf(
            CredentialsBuilder,
        );
    });

    describe('when calling create', () => {
        let result: Credentials;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a Credentials', () => {
            expect(result).toBeInstanceOf(Credentials);
        });
    });

    describe('when calling setPassword', () => {
        const password = 'Abcd123';
        let result: CredentialsBuilder;
        beforeEach(() => {
            result = builder.setPassword(password);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let credentials: Credentials;
            beforeEach(() => {
                credentials = builder.create();
            });

            it('then should return a Credentials', () => {
                expect(credentials).toBeInstanceOf(Credentials);
            });

            it('then should set the Credentials password', () => {
                expect(credentials.password).toBe(password);
            });
        });
    });
});
