import {
    Arg,
    Args,
    Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import { Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Membership } from '../entity/Membership';
import { Product } from '../entity/Product';
import { User } from '../entity/User';
import { UserBuilder } from '../service/builders/UserBuilder';
import { NewUser, UserQuery } from './types/User';

@Resolver(of => User)
export class UserResolver {
    @InjectRepository(User) private readonly usersRepository: Repository<User>;

    @InjectRepository(Membership)
    private readonly membershipsRepository: Repository<Membership>;

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>;

    @Inject()
    private readonly builder: UserBuilder;

    @Query(returns => User, { nullable: true })
    async user(@Args() query: UserQuery): Promise<User> {
        return this.usersRepository.findOne(query);
    }

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return this.usersRepository.find();
    }

    @Query(returns => User)
    @Authorized()
    async me(@Ctx('user') current: User) {
        return current;
    }

    @Mutation(returns => User)
    async createUser(@Arg('user') newUser: NewUser): Promise<User> {
        const user = this.builder
            .setFirstName(newUser.firstName)
            .setLastName(newUser.lastName)
            .setBirthday(newUser.birthday)
            .setEmail(newUser.email)
            .setPassword(newUser.password)
            .create();

        return this.usersRepository.save(user);
    }

    @FieldResolver(type => [Membership], { nullable: true })
    @Authorized()
    async memberships(
        @Ctx('user') current: User,
        @Root() user: User,
    ): Promise<Membership[]> {
        if (current.id !== user.id) {
            return null;
        }

        return this.membershipsRepository.find({ user });
    }

    @FieldResolver(type => [Product], { nullable: true })
    @Authorized()
    async products(@Ctx('user') current: User, @Root() user: User): Promise<Product[]> {
        if (current.id !== user.id) {
            return null;
        }

        return this.productRepository.find({ creator: user });
    }
}
