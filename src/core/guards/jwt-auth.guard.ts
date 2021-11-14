import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, Logger, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_ACCESS } from '@core/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_ACCESS) {
  private logger: Logger = new Logger(JwtAuthGuard.name);

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
    return ctx.getContext().req;
  }
}
