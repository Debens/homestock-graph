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

    @Field({ nullable: true })
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

    @Field()
    birthday: Date;

    @Field()
    password: string;
}
