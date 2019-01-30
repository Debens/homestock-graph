import { Service } from 'typedi';

import { Authentication } from '../../entity/Authentication';

@Service()
export class AuthenticationBuilder {
    constructor(private readonly auth: Authentication = new Authentication()) {}

    create(): Authentication {
        return this.auth;
    }

    setPassword(password: string): AuthenticationBuilder {
        this.auth.password = password;

        return this;
    }
}
