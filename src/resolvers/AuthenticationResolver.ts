import { Args, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { User } from '../entity/User';
import { Authenticator } from '../service/Authenticator';
import { TokenService } from '../service/TokenService';
import { Credentials, Tokens } from './types/Authentication';

@Resolver()
export class UserResolver {
    @InjectRepository(User) private users: Repository<User>;

    @Inject()
    private tokens: TokenService;

    @Inject()
    private authenticator: Authenticator;

    @Query(returns => Tokens)
    async login(@Args() credentials: Credentials): Promise<Tokens> {
        const user = await this.users.findOne({ email: credentials.email });

        if (!user) {
            throw new Error('Invalid username/password');
        }

        if (!(await this.authenticator.verify(user, credentials.password))) {
            throw new Error('Invalid username/password');
        }

        return this.tokens.tokens(user);
    }
}
