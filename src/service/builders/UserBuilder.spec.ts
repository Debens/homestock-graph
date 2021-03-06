import Container from 'typedi';

import { Credentials } from '../../entity/Credentials';
import { UserRole } from '../../entity/model/authorization';
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
        let user: User;
        beforeEach(() => {
            user = builder.create();
        });

        it('then should return a user', () => {
            expect(user).toBeInstanceOf(User);
        });

        it('then should set the users role to a free account', () => {
            expect(user.role).toBe(UserRole.Free);
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
            let user: User;
            beforeEach(() => {
                user = builder.create();
            });

            it('then should return a user', () => {
                expect(user).toBeInstanceOf(User);
            });

            it('then should set the users first name', () => {
                expect(user.firstName).toBe(firstName);
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
            let user: User;
            beforeEach(() => {
                user = builder.create();
            });

            it('then should return a user', () => {
                expect(user).toBeInstanceOf(User);
            });

            it('then should set the users last name', () => {
                expect(user.lastName).toBe(lastName);
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
            let user: User;
            beforeEach(() => {
                user = builder.create();
            });

            it('then should return a user', () => {
                expect(user).toBeInstanceOf(User);
            });

            it('then should set the users email address', () => {
                expect(user.email).toBe(email);
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
            let user: User;
            beforeEach(() => {
                user = builder.create();
            });

            it('then should return a user', () => {
                expect(user).toBeInstanceOf(User);
            });

            it('then should set the users birthday', () => {
                expect(user.birthday).toBe(birthday);
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
            let user: User;
            beforeEach(() => {
                user = builder.create();
            });

            it('then should return a user', () => {
                expect(user).toBeInstanceOf(User);
            });

            it('then should create an credentials context for the user', () => {
                expect(user.credentials).toBeInstanceOf(Credentials);
            });

            it('then should attach the password to the credentials context', () => {
                expect(user.credentials.password).toBe(password);
            });
        });
    });
});
