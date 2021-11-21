import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field({ nullable: true })
  startCursor: string;

  @Field({ nullable: true })
  endCursor: string;

  @Field(() => Int)
  countTotal: number;

  @Field(() => Int, { nullable: true })
  countBefore: number;

  @Field(() => Int, { nullable: true })
  countAfter: number;

  constructor(init?: Partial<PaginationInfo>) {
    Object.assign(this, init);
  }
}
