import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, Logger, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH } from '@core/constants';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(JWT_REFRESH) {
  private logger: Logger = new Logger(JwtRefreshGuard.name);

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
