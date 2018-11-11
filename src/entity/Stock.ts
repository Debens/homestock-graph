import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import uuid from 'uuid/v1';

import { Container } from './Container';
import { Product } from './Product';

@Entity()
export class Stock {
    @PrimaryColumn() id: string;

    @Column() created: Date;

    @Column({ default: 1 })
    quantity: number;

    @Column({ nullable: true })
    expiry: Date;

    @ManyToOne(type => Product, product => product.stock, {
        // eager: true,
        cascade: true, // Does not work -- Do not rely or remove
        onDelete: 'CASCADE',
    })
    product: Product;

    @ManyToOne(type => Container, container => container.inventory, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    container: Container;

    @BeforeInsert()
    generateInsertValues() {
        this.id = uuid();
        this.created = new Date();
    }
}
