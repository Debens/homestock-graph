import {
    BeforeInsert,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import uuid from 'uuid/v1';

import { Membership } from './Membership';
import { Stock } from './Stock';

@Entity()
export class Container {
    @PrimaryColumn() id: string;

    @Column() name: string;

    @Column() created: Date;

    @OneToMany(type => Membership, rel => rel.container)
    memberships: Membership[];

    @OneToMany(type => Stock, stock => stock.container)
    inventory: Stock[];

    @BeforeInsert()
    generateID() {
        this.id = uuid();
        this.created = new Date();
    }
}
