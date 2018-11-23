import { Field, InputType } from 'type-graphql';

import { Product } from '../../entity/Product';

@InputType()
export class NewProduct implements Partial<Product> {
    @Field()
    name: string;
}
