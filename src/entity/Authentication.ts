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
    @OneToOne(type => User, user => user.authentication, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

    @Inject(type => Authenticator)
    private readonly authenticator: Authenticator;

    @BeforeInsert()
    hashPassword() {
        this.salt = this.authenticator.salt();

        this.password = this.authenticator.hash(this.password, this.salt);
    }
}
