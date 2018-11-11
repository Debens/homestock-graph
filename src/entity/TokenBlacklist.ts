import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class TokenBlacklist {
    @PrimaryGeneratedColumn() id: string;

    @Column() ati: string;

    @Column() rti: string;

    @Column() expiry: Date;

    @ManyToOne(type => User, { onDelete: 'CASCADE' })
    user: User;
}
