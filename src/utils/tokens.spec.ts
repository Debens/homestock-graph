import { getTokenExpiry } from './tokens';

describe('getTokenExpiry', () => {
    const tokenTimeout = 100;
    beforeAll(() => {
        process.env.TOKEN_ACCESS_EXPIRES_IN = tokenTimeout.toString();
    });

    describe('when called', () => {
        const result = getTokenExpiry();

        it('then should return a date', () => {
            expect(result).toBeInstanceOf(Date);
        });
    });
});
