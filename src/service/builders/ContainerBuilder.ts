import { Service } from 'typedi';

import { Container } from '../../entity/Container';
import { Membership } from '../../entity/Membership';
import { User } from '../../entity/User';
import { Role } from '../../utils/membership';
import { MembershipBuilder } from './MembershipBuider';

export interface IMemberOptions {
    access?: Role;
}

const DEFAULT_MEMBER_OPTIONS: IMemberOptions = {
    access: Role.Read,
};

@Service()
export class ContainerBuilder {
    constructor(private container: Container = new Container()) {}

    create(): Container {
        return this.container;
    }

    setName(name: string): ContainerBuilder {
        this.container.name = name;

        return this;
    }

    setOwner(user: User): ContainerBuilder {
        const relation = new MembershipBuilder()
            .setContainer(this.container)
            .setUser(user)
            .setPending(false)
            .setRole(Role.Owner)
            .create();

        this.container.memberships = this.container.memberships || [];

        this.container.memberships.push(relation);

        return this;
    }

    addMember(member: User, options?: IMemberOptions): ContainerBuilder {
        const memberOptions = { ...DEFAULT_MEMBER_OPTIONS, ...options };

        const relation = new MembershipBuilder()
            .setContainer(this.container)
            .setUser(member)
            .setPending(true)
            .setRole(memberOptions.access)
            .create();

        this.container.memberships = this.container.memberships || [];

        this.container.memberships.push(relation);

        return this;
    }
}

export default ContainerBuilder;
