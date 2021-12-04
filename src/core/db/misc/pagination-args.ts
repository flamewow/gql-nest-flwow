import { ArgsType, Int, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationCursorArgs {
  @Field(() => Int, { nullable: true })
  first: number;

  @Field(() => String, { nullable: true })
  after: string;

  @Field(() => Int, { nullable: true })
  last: number;

  @Field(() => String, { nullable: true })
  before: string;
}
