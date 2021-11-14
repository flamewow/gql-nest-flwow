import { UserEntity } from '@core/db/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInUpInput } from './dto/new-recipe.input';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ITokens } from './auth.interfaces';
import { HashPasswordService } from '@common/services/hash-password.service';
import { config } from '@core/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private recipeRepository: Repository<UserEntity>,
    private hashPasswordService: HashPasswordService,
    private jwtService: JwtService,
  ) {}

  async registerUser(data: SignInUpInput): Promise<UserEntity> {
    const user = this.recipeRepository.create(data);
    const insertionResults = await this.recipeRepository.insert(user);
    if (insertionResults) {
      console.log(insertionResults);
    }
    return user;
  }

  async findUserByUUID(uuid: string): Promise<UserEntity> {
    const recipe = await this.recipeRepository.findOne({ where: { uuid } });
    return recipe;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const recipe = await this.recipeRepository.findOne({ where: { email } });
    return recipe;
  }

  async verifyUserCredentials(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.findUserByEmail(email);
    const isCredentialsValid = await this.hashPasswordService.comparePassword(password, user.password);
    return isCredentialsValid ? user : null;
  }

  async generateTokens(payload: Record<string, string | number | boolean>): Promise<ITokens> {
    return {
      accessToken: await this.jwtService.signAsync(payload, { expiresIn: config.jwtAccessExpiresIn }),
      refreshToken: await this.jwtService.signAsync(payload, { expiresIn: config.jwtRefreshExpiresIn, secret: config.jwtRefreshSecret }),
    };
  }
}
