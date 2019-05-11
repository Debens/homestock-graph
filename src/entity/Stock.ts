import { Field, ID, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import uuid from 'uuid/v1';

import { Container } from './Container';
import { Product } from './Product';

@ObjectType()
@Entity()
export class Stock {
    @Field(type => ID)
    @PrimaryColumn()
    id: string;

    @Field()
    @Column()
    created: Date;

    @Field()
    @Column({ default: 1 })
    quantity: number;

    @Field()
    @Column({ nullable: true })
    expiry: Date;

    @Field(type => Product)
    @ManyToOne(type => Product, product => product.stock, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    product: Product;

    @Field(type => Container)
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
