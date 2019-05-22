import { GraphQLDateTime } from 'graphql-iso-date';
import { Field, ID, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import uuid from 'uuid/v1';

import { Membership } from './Membership';
import { Stock } from './Stock';

@ObjectType()
@Entity()
export class Container {
    @Field(type => ID)
    @PrimaryColumn()
    id: string;

    @Field()
    @Column()
    name: string;

    @Field(type => GraphQLDateTime)
    @Column({ type: 'datetime' })
    created: Date;

    @Field(type => [Membership])
    @OneToMany(type => Membership, rel => rel.container, {
        cascade: true,
    })
    memberships: Membership[];

    @Field(type => [Stock])
    @OneToMany(type => Stock, stock => stock.container)
    inventory: Stock[];

    @BeforeInsert()
    generateID() {
        this.id = uuid();
        this.created = new Date();
    }
}
