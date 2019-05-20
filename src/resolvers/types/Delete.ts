import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DeleteResult {
    @Field({ nullable: false })
    affected: number;
}
