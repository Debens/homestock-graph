import Container from 'typedi';

import { Authentication } from '../../entity/Authentication';
import { UserRole } from '../../entity/model/athorization';
import { User } from '../../entity/User';
import { UserBuilder } from './UserBuilder';

describe('UserBuilder', () => {
    let builder: UserBuilder;
    beforeEach(() => {
        builder = new UserBuilder();
    });

    it('should be a typedi service', () => {
        expect(Container.get(UserBuilder)).toBeInstanceOf(UserBuilder);
    });

    describe('when calling create', () => {
        let result: User;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a user', () => {
            expect(result).toBeInstanceOf(User);
        });

        it('then should set the users role to a free account', () => {
            expect(result.role).toBe(UserRole.Free);
        });
    });

    describe('when calling setFirstName', () => {
        const firstName = 'zac';
        let result: UserBuilder;
        beforeEach(() => {
            result = builder.setFirstName(firstName);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: User;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a user', () => {
                expect(result).toBeInstanceOf(User);
            });

            it('then should set the users first name', () => {
                expect(result.firstName).toBe(firstName);
            });
        });
    });

    describe('when calling setLastName', () => {
        const lastName = 'efron';
        let result: UserBuilder;
        beforeEach(() => {
            result = builder.setLastName(lastName);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: User;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a user', () => {
                expect(result).toBeInstanceOf(User);
            });

            it('then should set the users last name', () => {
                expect(result.lastName).toBe(lastName);
            });
        });
    });

    describe('when calling setEmail', () => {
        const email = 'zac@efron.com';
        let result: UserBuilder;
        beforeEach(() => {
            result = builder.setEmail(email);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: User;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a user', () => {
                expect(result).toBeInstanceOf(User);
            });

            it('then should set the users email address', () => {
                expect(result.email).toBe(email);
            });
        });
    });

    describe('when calling setBirthday', () => {
        const birthday = new Date('1987-10-18');
        let result: UserBuilder;
        beforeEach(() => {
            result = builder.setBirthday(birthday);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: User;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a user', () => {
                expect(result).toBeInstanceOf(User);
            });

            it('then should set the users birthday', () => {
                expect(result.birthday).toBe(birthday);
            });
        });
    });

    describe('when calling setPassword', () => {
        const password = 'Abcd123';
        let result: UserBuilder;
        beforeEach(() => {
            result = builder.setPassword(password);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: User;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a user', () => {
                expect(result).toBeInstanceOf(User);
            });

            it('then should create an authentication context for the user', () => {
                expect(result.authentication).toBeInstanceOf(Authentication);
            });

            it('then should attach the password to the authentication context', () => {
                expect(result.authentication.password).toBe(password);
            });
        });
    });
});
