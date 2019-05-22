import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
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

import { Credentials } from './Credentials';
import { Membership } from './Membership';
import { UserRole } from './model/authorization';
import { Product } from './Product';
import { Session } from './Session';

@ObjectType()
@Entity()
export class User {
    @Field(type => ID)
    @PrimaryColumn()
    id: string;

    @Field(type => GraphQLDateTime)
    @Column({ type: 'datetime' })
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

    @Field(type => Credentials)
    @OneToOne(type => Credentials, credential => credential.user, {
        cascade: true,
        nullable: false,
    })
    credentials: Credentials;

    @Field(type => [Session])
    @OneToMany(type => Session, session => session.user, {
        cascade: true,
    })
    sessions: Session[];

    @BeforeInsert()
    beforeInset() {
        this.id = uuid();
        this.created = new Date();
    }
}
