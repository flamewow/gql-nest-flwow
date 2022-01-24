import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from '@core/config';
import { JWT_REFRESH } from '@core/constants';
import { AuthService } from '@modules/auth/auth.service';
import { UserEntity } from '@core/db/entities/user.entity';

export interface IJWTPayload {
  uuid: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_REFRESH) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: config.jwtRefreshSecret,
    });
  }

  async validate({ uuid }: IJWTPayload): Promise<UserEntity | null> {
    return this.authService.findUserByUUID(uuid);
  }
}
