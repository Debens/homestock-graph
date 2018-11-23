import Container from 'typedi';

import { Authenticator } from './Authenticator';

describe('Authenticator', () => {
    const authenticator = new Authenticator();

    it('should be a typedi service', () => {
        expect(Container.get(Authenticator)).toBeInstanceOf(Authenticator);
    });

    describe('salt', () => {
        describe('when called with no arguments', () => {
            const result = authenticator.salt();

            it('then should return a 16 length string', () => {
                expect(result).toHaveLength(16);
            });

            it('then should be a not deterministic string', () => {
                expect(result).not.toEqual(authenticator.salt());
            });
        });

        describe('when called with a length', () => {
            const length = 20;
            const result = authenticator.salt(length);

            it('then should return a string of the given length', () => {
                expect(result).toHaveLength(length);
            });
        });
    });

    describe('hash', () => {
        const password = 'Abcd123';
        const salt = authenticator.salt();

        const result = authenticator.hash(password, salt);

        describe('when called with a password and salt', () => {
            it('then should return a deterministic string', () => {
                expect(result).toEqual(authenticator.hash(password, salt));
            });
        });

        describe('when called with a different salt', () => {
            const newSalt = authenticator.salt();

            const newResult = authenticator.hash(password, newSalt);

            it('then should return a different string', () => {
                expect(result).not.toEqual(newResult);
            });
        });
    });

    describe('verify', () => {
        // TODO: verify spec
    });
});
