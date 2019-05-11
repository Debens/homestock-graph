import { Field, InputType } from 'type-graphql';

import { Container } from '../../entity/Container';

@InputType()
export class NewContainer implements Partial<Container> {
    @Field()
    name: string;
}
