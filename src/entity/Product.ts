import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import uuid from 'uuid/v1';

import { Stock } from './Stock';
import { User } from './User';

@Entity()
export class Product {
    @PrimaryColumn() id: string;

    @Column() name: string;

    @Column() created: Date;

    @ManyToOne(type => User, rel => rel.products, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    creator: User;

    @OneToMany(type => Stock, stock => stock.product)
    stock: Stock[];

    @BeforeInsert()
    beforeInset() {
        this.id = uuid();
        this.created = new Date();
    }
}
