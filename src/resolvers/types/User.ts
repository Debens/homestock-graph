import { GraphQLDate } from 'graphql-iso-date';
// tslint:disable:max-classes-per-file
import { ArgsType, Field, InputType } from 'type-graphql';

import { User } from '../../entity/User';

@ArgsType()
export class UserQuery implements Partial<User> {
    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName: string;

    @Field({ nullable: true })
    email: string;

    @Field(type => GraphQLDate, { nullable: true })
    birthday: Date;
}

@InputType()
export class NewUser implements Partial<User> {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field(type => GraphQLDate)
    birthday: Date;

    @Field()
    password: string;
}
