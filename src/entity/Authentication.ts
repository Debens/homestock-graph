import crypto from 'crypto';
import {
    BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';

import { User } from './User';

@Entity()
export class Authentication {
    @PrimaryGeneratedColumn() id: string;

    @Column() password: string;

    @Column() salt: string;

    @OneToOne(type => User, User => User.auth, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

    @BeforeInsert()
    hashPassword() {
        this.salt = this.salt || this.generateSalt();

        this.password = this.hash(this.salt);
    }

    generateSalt(length: number = 16): string {
        return crypto
            .randomBytes(Math.floor(length / 2))
            .toString('hex')
            .slice(0, length);
    }

    hash(salt: string): string {
        return crypto
            .createHmac('sha512', salt)
            .update(this.password)
            .digest('hex');
    }
}
