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

import { createSalt, hashPassword } from '../service/password';
import { User } from './User';

@ObjectType()
@Entity()
export class Credential {
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
    @OneToOne(type => User, user => user.credentials, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

    @BeforeInsert()
    hashPassword() {
        this.salt = createSalt();
        this.password = hashPassword(this.password, this.salt);
    }
}
