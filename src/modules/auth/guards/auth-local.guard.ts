import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL } from '@core/constants';

@Injectable()
export class AuthLocalGuard extends AuthGuard(LOCAL) {
  private logger: Logger = new Logger(AuthLocalGuard.name);

  handleRequest(err: any, user: any, info: any) {
    if (info) {
      this.logger.debug(info);
    }
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    req.body = ctx.getArgs();
    return req;
  }
}
