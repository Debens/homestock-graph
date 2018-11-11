import { Role } from './../utils/membership';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Container } from './Container';
import { User } from './User';

@Entity()
export class Membership {
    @PrimaryGeneratedColumn() id: string;

    @ManyToOne(type => User, user => user.id, {
        onDelete: 'CASCADE',
    })
    user: User;

    @ManyToOne(type => Container, container => container.memberships, {
        onDelete: 'CASCADE',
    })
    container: Container;

    @Column() created: Date;

    @Column('enum', { enum: Role })
    role: Role

    @Column({ default: true })
    pending: boolean;

    @BeforeInsert()
    generateInsertValues() {
        this.created = new Date();
    }
}
