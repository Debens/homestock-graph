import { Inject } from 'typedi';
import { DeepPartial, EntityManager } from 'typeorm';
import { Authorized, Controller, Mutation, Query } from 'vesper';

import { User } from '../entity/User';
import { CURRENT_USER } from '../index';
import { UserBuilder } from '../service/builders/UserBuilder';

type UserQuery = DeepPartial<User>;

interface INewUser {
    firstName: string;
    lastName: string;
    birthday: Date;
    email: string;
    password: string;
}

interface INewUserParams {
    user: INewUser;
}

@Controller()
export class UserController {
    @Inject(CURRENT_USER)
    private current: User;

    constructor(private entityManager: EntityManager, private builder: UserBuilder) {}

    @Query()
    user(query: UserQuery) {
        return this.entityManager.findOne(User, query);
    }

    @Query()
    users() {
        return this.entityManager.find(User);
    }

    @Query()
    @Authorized()
    me() {
        return this.current;
    }

    @Mutation()
    createUser({ user }: INewUserParams) {
        const newUser = this.builder
            .setFirstName(user.firstName)
            .setLastName(user.lastName)
            .setBirthday(user.birthday)
            .setEmail(user.email)
            .setPassword(user.password)
            .create();

        return this.entityManager.save(User, newUser);
    }

    @Mutation()
    async delteUser(query: UserQuery) {
        await this.entityManager.remove(User, query);

        return true;
    }
}
