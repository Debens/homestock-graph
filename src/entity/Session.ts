import { GraphQLDateTime } from 'graphql-iso-date';
import { Field, ID, ObjectType } from 'type-graphql';
import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import uuid from 'uuid/v1';

import { User } from './User';

@ObjectType()
@Entity()
export class Session {
    @Field(type => ID)
    @PrimaryColumn()
    id: string;

    @Field(type => GraphQLDateTime)
    @Column({ type: 'datetime' })
    created: Date;

    @Field(type => GraphQLDateTime)
    @Column({ type: 'datetime' })
    expiry: Date;

    @Field(type => User)
    @OneToMany(type => User, user => user.sessions, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

    @BeforeInsert()
    hashPassword() {
        this.id = uuid();
        this.created = new Date();
    }
}
