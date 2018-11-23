import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {
    BeforeInsert,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import uuid from 'uuid/v1';

import { Stock } from './Stock';
import { User } from './User';

@ObjectType()
@Entity()
export class Product {
    @Field(type => ID)
    @PrimaryColumn()
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    created: Date;

    @Field(type => User, { nullable: true })
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
