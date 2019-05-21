import { Args, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { User } from '../entity/User';
import { hashPassword } from '../service/password';
import { TokenService } from '../service/TokenService';
import { LoginPayload, Tokens } from './types/Authentication';

@Resolver()
export class UserResolver {
    @InjectRepository(User) private readonly users: Repository<User>;

    @Inject()
    private readonly tokens: TokenService;

    @Query(returns => Tokens)
    async login(@Args() credentials: LoginPayload): Promise<Tokens> {
        // TODO: switch to session based tokens
        const user = await this.users.findOne(
            { email: credentials.email },
            { relations: ['credentials'] },
        );

        if (!user) {
            throw new Error('Invalid username/password');
        }

        const { password, salt } = user.credentials;
        const isValid = hashPassword(credentials.password, salt) === password;

        if (!isValid) {
            throw new Error('Invalid username/password');
        }

        return this.tokens.tokens(user);
    }
}
