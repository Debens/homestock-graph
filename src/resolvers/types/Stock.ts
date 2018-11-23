import { Field, InputType } from 'type-graphql';

@InputType()
export class NewStock {
    @Field({ nullable: true })
    quantity: number;

    @Field({ nullable: true })
    expiry: Date;

    @Field()
    product: string;

    @Field()
    container: string;
}
