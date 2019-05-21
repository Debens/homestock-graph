import { GraphQLDate } from 'graphql-iso-date';
import { Field, ID, ObjectType } from 'type-graphql';
import { Inject } from 'typedi';
import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { createSalt, hashPassword } from '../service/password';
import { User } from './User';

@ObjectType()
@Entity()
export class Session {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(type => GraphQLDate)
    @Column({ type: 'date' })
    created: Date;

    @Field(type => GraphQLDate)
    @Column({ type: 'date' })
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
        this.created = new Date();
    }
}
