import crypto from 'crypto';
import { EntityManager } from 'typeorm';
import { Controller, Query } from 'vesper';

import { User } from '../entity/User';
import { Authenticator } from '../service/Authenticator';

interface ICredentials {
    email: string;
    password: string;
}

@Controller()
export class AuthenticationController {
    constructor(
        private entityManager: EntityManager,
        private authenticor: Authenticator,
    ) {}

    @Query()
    async login(credentials: ICredentials) {
        const user = await this.entityManager.findOne(
            User,
            { email: credentials.email },
            { relations: ['auth'] },
        );

        if (
            !user ||
            this.authenticor.hash(credentials.password, user.auth.salt) !==
                user.auth.password
        ) {
            throw new Error('Invalid credentials');
        }

        return this.authenticor.build(user.id);
    }
}
