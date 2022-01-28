import { UserEntity } from '@core/db/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { SignInInput, SignUpInput } from './dto/inputs';
import { AuthService } from './auth.service';
import { RefreshTokenResult, SignInResult } from './dto/results';
import { AuthLocalGuard } from './guards/auth-local.guard';
import { User } from '@core/decorators/user.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

const USER_SIGNED_IN = 'userSignedIn';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResult)
  @UseGuards(AuthLocalGuard)
  async signIn(@Args('input') input: SignInInput, @User() user: UserEntity): Promise<SignInResult> {
    const tokens = await this.authService.generateTokens4User(user);
    pubSub.publish(USER_SIGNED_IN, { [USER_SIGNED_IN]: user });
    return { user, ...tokens };
  }

  @Mutation(() => UserEntity)
  async signUp(@Args('input') input: SignUpInput): Promise<UserEntity> {
    const user = await this.authService.registerUser(input);
    return user;
  }

  @Mutation(() => RefreshTokenResult)
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Args('refreshToken') refreshToken: string, @User() user: UserEntity): Promise<SignInResult> {
    const tokens = await this.authService.generateTokens4User(user);
    return { user, ...tokens };
  }

  @Subscription(() => UserEntity, { name: USER_SIGNED_IN })
  userSignedIn() {
    return pubSub.asyncIterator(USER_SIGNED_IN);
  }
}
