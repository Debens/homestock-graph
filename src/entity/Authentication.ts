import { Field, ID, ObjectType } from 'type-graphql';
import { Inject } from 'typedi';
import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Authenticator } from '../service/Authenticator';
import { User } from './User';

@ObjectType()
@Entity()
export class Authentication {
    @Inject(type => Authenticator)
    private authenticator: Authenticator;

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    salt: string;

    @Field(type => User)
    @OneToOne(type => User, User => User.authentication, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

    @BeforeInsert()
    hashPassword() {
        this.salt = this.authenticator.salt();

        this.password = this.authenticator.hash(this.password, this.salt);
    }
}
