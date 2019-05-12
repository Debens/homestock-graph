import { createSalt, hashPassword } from './password';

describe('createSalt', () => {
    describe('when called with no arguments', () => {
        const result = createSalt();

        it('then should return a 16 length string', () => {
            expect(result).toHaveLength(16);
        });

        it('then should be a not deterministic string', () => {
            expect(result).not.toEqual(createSalt());
        });
    });

    describe('when called with a length', () => {
        const length = 20;
        const result = createSalt(length);

        it('then should return a string of the given length', () => {
            expect(result).toHaveLength(length);
        });
    });
});

describe('hashPassword', () => {
    const password = 'Abcd123';
    const salt = createSalt();

    const result = hashPassword(password, salt);

    describe('when called with a password and salt', () => {
        it('then should return a deterministic string', () => {
            expect(result).toEqual(hashPassword(password, salt));
        });
    });

    describe('when called with a different salt', () => {
        const newSalt = createSalt();

        const newResult = hashPassword(password, newSalt);

        it('then should return a different string', () => {
            expect(result).not.toEqual(newResult);
        });
    });
});
