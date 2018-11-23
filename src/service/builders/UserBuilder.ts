import { Service } from 'typedi';

import { UserRole } from '../../entity/model/athorization';
import { User } from '../../entity/User';
import { AuthenticationBuilder } from './AuthenticationBuilder';

@Service()
export class UserBuilder {
    constructor(private user: User = new User()) {}

    create() {
        this.user.role = UserRole.Free;

        return this.user;
    }

    setFirstName(name: string): UserBuilder {
        this.user.firstName = name;

        return this;
    }

    setLastName(name: string): UserBuilder {
        this.user.lastName = name;

        return this;
    }

    setEmail(email: string): UserBuilder {
        this.user.email = email;

        return this;
    }

    setBirthday(birthday: Date): UserBuilder {
        this.user.birthday = birthday;

        return this;
    }

    setPassword(password: string): UserBuilder {
        this.user.authentication = new AuthenticationBuilder()
            .setPassword(password)
            .create();

        return this;
    }
}

export default UserBuilder;
