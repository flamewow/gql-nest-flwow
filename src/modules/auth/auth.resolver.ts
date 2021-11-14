import { UserEntity } from '@core/db/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignInUpInput } from './dto/new-recipe.input';
import { AuthService } from './auth.service';
import { SignInResult } from './dto/sign-in.result';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => SignInResult)
  async signIn(@Args('signInUpInput') signInUpInput: SignInUpInput): Promise<SignInResult> {
    const user = await this.authService.verifyUserCredentials(signInUpInput.email, signInUpInput.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { uuid, email, role } = user;
    const payload = { uuid, email, role };
    const tokens = await this.authService.generateTokens(payload);

    return {
      user,
      ...tokens,
    };
  }

  @Mutation(() => UserEntity)
  async signUp(@Args('signInUpInput') signInUpInput: SignInUpInput): Promise<UserEntity> {
    const user = await this.authService.registerUser(signInUpInput);
    return user;
  }
}
