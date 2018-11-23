import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Container } from '../entity/Container';
import { Membership } from '../entity/Membership';
import { User } from '../entity/User';

@Resolver(of => Membership)
export class MembershipResolver {
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>;

    @FieldResolver(type => Container)
    async container(@Root() membership: Membership): Promise<Container> {
        const relation = await this.membershipRepository.findOne(
            { id: membership.id },
            { relations: ['container'] },
        );

        return relation.container;
    }

    @FieldResolver(type => User)
    async user(@Root() membership: Membership): Promise<User> {
        const relation = await this.membershipRepository.findOne(
            { id: membership.id },
            { relations: ['user'] },
        );

        return relation.user;
    }
}
