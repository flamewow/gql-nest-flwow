import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from '@core/db/entities/user.entity';
import { LOCAL } from '@core/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'input[]email',
      passwordField: 'input[]password',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity | null> {
    return this.authService.verifyUserCredentials(email, password);
  }
}
