import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import uuid from 'uuid/v1';

import { Authentication } from './Authentication';
import { Membership } from './Membership';
import { Product } from './Product';
import { TokenBlacklist } from './TokenBlacklist';

@Entity()
export class User {
    @PrimaryColumn() id: string;

    @Column() created: Date;

    @Column() firstName: string;

    @Column() lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'date' })
    birthday: Date;

    @OneToOne(type => Authentication, auth => auth.user, {
        nullable: false,
        cascade: true,
    })
    auth: Authentication;

    @OneToMany(type => TokenBlacklist, token => token.user, {
        cascade: true,
    })
    blacklistedTokens: TokenBlacklist;

    @OneToMany(type => Membership, rel => rel.user, { cascade: true })
    memberships: Membership[];

    @OneToMany(type => Product, rel => rel.creator)
    products: Product[];

    @BeforeInsert()
    beforeInset() {
        this.id = uuid();
        this.created = new Date();
    }
}
