import { Service } from 'typedi';

import { Credentials } from '../../entity/Credentials';

@Service()
export class CredentialsBuilder {
    constructor(private readonly auth: Credentials = new Credentials()) {}

    create(): Credentials {
        return this.auth;
    }

    setPassword(password: string): CredentialsBuilder {
        this.auth.password = password;

        return this;
    }
}
