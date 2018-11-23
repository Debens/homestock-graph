import { Field, ID, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Container } from './Container';
import { MembershipRole } from './model/membership';
import { User } from './User';

@ObjectType()
@Entity()
export class Membership {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(type => User)
    @ManyToOne(type => User, user => user.id, {
        onDelete: 'CASCADE',
    })
    user: User;

    @Field(type => Container)
    @ManyToOne(type => Container, container => container.memberships, {
        onDelete: 'CASCADE',
    })
    container: Container;

    @Field()
    @Column()
    created: Date;

    @Field(type => MembershipRole)
    @Column('enum', { enum: MembershipRole })
    role: MembershipRole;

    @Field()
    @Column({ default: true })
    pending: boolean;

    @BeforeInsert()
    generateInsertValues() {
        this.created = new Date();
    }
}
