import { GraphQLDateTime } from 'graphql-iso-date';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewStock {
    @Field({ nullable: true })
    quantity: number;

    @Field(type => GraphQLDateTime, { nullable: true })
    expiry: Date;

    @Field()
    product: string;

    @Field()
    container: string;
}
