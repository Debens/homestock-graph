import { Service } from 'typedi';

import { Container } from '../../entity/Container';
import { Membership } from '../../entity/Membership';
import { User } from '../../entity/User';
import { Role } from '../../utils/membership';

@Service()
export class MembershipBuilder {
    constructor(private relation: Membership = new Membership()) {}

    create(): Membership {
        return this.relation;
    }

    setRole(role: Role): MembershipBuilder {
        this.relation.role = role;

        return this;
    }

    setUser(user: User): MembershipBuilder {
        this.relation.user = user;

        return this;
    }

    setContainer(container: Container): MembershipBuilder {
        this.relation.container = container;

        return this;
    }

    setPending(isPending: boolean): MembershipBuilder {
        this.relation.pending = isPending;

        return this;
    }
}
