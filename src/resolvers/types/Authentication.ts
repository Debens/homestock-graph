// tslint:disable:max-classes-per-file
import { ArgsType, Field, ObjectType } from 'type-graphql';

@ArgsType()
export class Credentials {
    @Field()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class Tokens {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    @Field()
    expiresIn: string;
}
