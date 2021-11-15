import { UserEntity } from '@core/db/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInResult {
  @Field()
  user: UserEntity;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
