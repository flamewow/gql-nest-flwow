import { UserEntity } from '@core/db/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpInput } from './dto/inputs';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ITokens } from './auth.interfaces';
import { HashPasswordService } from '@common/services/hash-password.service';
import { config } from '@core/config';
import { PG_ERR_CODES } from '@core/db/pg-err-codes';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private hashPasswordService: HashPasswordService,
    private jwtService: JwtService,
  ) {}

  async registerUser(data: SignUpInput): Promise<UserEntity> {
    const user = this.usersRepository.create(data);
    user.password = await this.hashPasswordService.getHash(data.password);

    await this.usersRepository.insert(user).catch((err) => {
      const errCode = err.code;
      if (errCode === PG_ERR_CODES.uniqueViolation) {
        throw new Error('User with that email already exists');
      }
      this.logger.error(`failed with error: ${err}`);
      throw new Error('Something went wrong');
    });

    return user;
  }

  async findUserByUUID(uuid: string): Promise<UserEntity> {
    const recipe = await this.usersRepository.findOne({ where: { uuid } });
    return recipe;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const recipe = await this.usersRepository.findOne({ where: { email } });
    return recipe;
  }

  async verifyUserCredentials(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.findUserByEmail(email);
    const isCredentialsValid = await this.hashPasswordService.comparePassword(password, user.password);
    return isCredentialsValid ? user : null;
  }

  async generateTokens4User(user: UserEntity): Promise<ITokens> {
    const { uuid, email, role } = user;
    return this.generateTokens({ uuid, email, role });
  }

  private async generateTokens(payload: Record<string, string | number | boolean>): Promise<ITokens> {
    return {
      accessToken: await this.jwtService.signAsync(payload, { expiresIn: config.jwtAccessExpiresIn }),
      refreshToken: await this.jwtService.signAsync(payload, { expiresIn: config.jwtRefreshExpiresIn, secret: config.jwtRefreshSecret }),
    };
  }
}
