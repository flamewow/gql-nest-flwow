import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from '@core/config';
import { JWT_ACCESS } from '@core/constants';
import { AuthService } from '@modules/auth/auth.service';
import { Request } from 'express';
import { UserEntity } from '@core/db/entities/user.entity';

export interface IJWTPayload {
  uuid: string;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JWT_ACCESS) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest:
        ExtractJwt.fromExtractors([
          (req: Request) => {
            return req?.cookies?.Authentication;
          },
        ]) || ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtAccessSecret,
    });
  }

  async validate({ uuid }: IJWTPayload): Promise<UserEntity | null> {
    return this.authService.findUserByUUID(uuid);
  }
}
