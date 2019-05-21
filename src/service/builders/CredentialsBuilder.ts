import { Service } from 'typedi';

import { Credential } from '../../entity/Credentials';

@Service()
export class CredentialsBuilder {
    constructor(private readonly auth: Credential = new Credential()) {}

    create(): Credential {
        return this.auth;
    }

    setPassword(password: string): CredentialsBuilder {
        this.auth.password = password;

        return this;
    }
}
