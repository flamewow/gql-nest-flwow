import { UserEntity } from '@core/db/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator((field: keyof UserEntity, ctx: ExecutionContext) => {
  const gqlCtx = GqlExecutionContext.create(ctx).getContext();
  const user = gqlCtx.req.user;
  return field ? user && user[field] : user;
});
