import { GraphQLDate } from 'graphql-iso-date';
import { Field, ID, ObjectType } from 'type-graphql';
import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import uuid from 'uuid/v1';

import { Authentication } from './Authentication';
import { Membership } from './Membership';
import { UserRole } from './model/authorization';
import { Product } from './Product';

@ObjectType()
@Entity()
export class User {
    @Field(type => ID)
    @PrimaryColumn()
    id: string;

    @Field()
    @Column()
    created: Date;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field(type => GraphQLDate)
    @Column({ type: 'date' })
    birthday: Date;

    @Field(type => UserRole)
    @Column('enum', { enum: UserRole })
    role: UserRole;

    @Field(type => [Membership], { nullable: true })
    @OneToMany(type => Membership, rel => rel.user, { cascade: true })
    memberships: Membership[];

    @Field(type => [Product])
    @OneToMany(type => Product, rel => rel.creator)
    products: Product[];

    @OneToOne(type => Authentication, auth => auth.user, {
        cascade: true,
        nullable: false,
    })
    authentication: Authentication;

    @BeforeInsert()
    beforeInset() {
        this.id = uuid();
        this.created = new Date();
    }
}
