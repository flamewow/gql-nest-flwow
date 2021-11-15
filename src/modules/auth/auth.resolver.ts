import { UserEntity } from '@core/db/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignInInput } from './dto/inputs';
import { AuthService } from './auth.service';
import { SignInResult } from './dto/results';
import { AuthLocalGuard } from './guards/auth-local.guard';
import { User } from '@core/decorators/user.decorator';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => SignInResult)
  @UseGuards(AuthLocalGuard)
  async signIn(@User() user: UserEntity, @Args('input') input: SignInInput): Promise<SignInResult> {
    const { uuid, email, role } = user;
    const payload = { uuid, email, role };
    const tokens = await this.authService.generateTokens(payload);

    return {
      user,
      ...tokens,
    };
  }

  @Mutation(() => UserEntity)
  async signUp(@Args('input') input: SignInInput): Promise<UserEntity> {
    const user = await this.authService.registerUser(input);
    return user;
  }
}
