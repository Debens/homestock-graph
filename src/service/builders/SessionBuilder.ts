import { Service } from 'typedi';

import { Session } from '../../entity/Session';
import { User } from '../../entity/User';
import { getTokenExpiry } from '../../utils/tokens';

@Service()
export class SessionBuilder {
    constructor(private readonly session: Session = new Session()) {}

    create(): Session {
        this.session.expiry = getTokenExpiry();

        return this.session;
    }

    setUser(user: User): SessionBuilder {
        this.session.user = user;

        return this;
    }
}
