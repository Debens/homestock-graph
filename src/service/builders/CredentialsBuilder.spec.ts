import InjectionContainer from 'typedi';

import { Credential } from '../../entity/Credentials';
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
        let result: Credential;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a Credentials', () => {
            expect(result).toBeInstanceOf(Credential);
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
            let result: Credential;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Credentials', () => {
                expect(result).toBeInstanceOf(Credential);
            });

            it('then should set the Credentialss password', () => {
                expect(result.password).toBe(password);
            });
        });
    });
});
