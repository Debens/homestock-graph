import crypto from 'crypto';
import { Service } from 'typedi';
import { getManager } from 'typeorm';

import { Authentication } from '../entity/Authentication';
import { User } from '../entity/User';

@Service()
export class Authenticator {
    salt(length: number = 16): string {
        return crypto
            .randomBytes(Math.floor(length / 2))
            .toString('hex')
            .slice(0, length);
    }

    hash(password: string, salt: string): string {
        return crypto
            .createHmac('sha512', salt)
            .update(password)
            .digest('hex');
    }

    async verify(user: User, password: string): Promise<boolean> {
        // FIXME: Cannot inject Authentication repository due to circular dependencies
        const entry = await getManager().findOneOrFail(Authentication, { user });

        return this.hash(password, entry.salt) === entry.password;
    }
}
