import { Service } from 'typedi';

import { Container } from '../../entity/Container';
import { Membership } from '../../entity/Membership';
import { MembershipRole } from '../../entity/model/membership';
import { User } from '../../entity/User';

@Service()
export class MembershipBuilder {
    constructor(private relation: Membership = new Membership()) {}

    create(): Membership {
        return this.relation;
    }

    setRole(role: MembershipRole): MembershipBuilder {
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
