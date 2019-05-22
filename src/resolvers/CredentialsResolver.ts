import { AuthenticationError } from 'apollo-server-core';
import { Args, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Credentials } from '../entity/Credentials';
import { Session } from '../entity/Session';
import { User } from '../entity/User';
import { SessionBuilder } from '../service/builders/SessionBuilder';
import { TokenService } from '../service/TokenService';
import { hashPassword } from '../utils/password';
import { LoginPayload, Tokens } from './types/Authentication';

@Resolver()
export class CredentialsResolver {
    @InjectRepository(User) private readonly users: Repository<User>;
    @InjectRepository(Credentials) private readonly credentials: Repository<Credentials>;
    @InjectRepository(Session) private readonly sessions: Repository<Session>;

    @Inject()
    private readonly tokens: TokenService;

    @Inject()
    private readonly builder: SessionBuilder;

    @Query(returns => Tokens)
    async login(@Args() payload: LoginPayload): Promise<Tokens> {
        // TODO: switch to session based tokens
        const user = await this.users.findOne({ email: payload.email });
        const credentials = await this.credentials.findOne({ user });

        if (!user || !credentials) {
            throw new AuthenticationError('Invalid username/password');
        }

        const { password, salt } = credentials;
        const isValid = hashPassword(payload.password, salt) === password;

        if (!isValid) {
            throw new AuthenticationError('Invalid username/password');
        }

        const session = this.builder.setUser(user).create();
        await this.sessions.insert(session);

        return this.tokens.tokens(session, user);
    }
}
