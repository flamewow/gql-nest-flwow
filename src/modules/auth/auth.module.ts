import { HashPasswordService } from '@common/services/hash-password.service';
import { config } from '@core/config';
import { UserEntity } from '@core/db/entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, JwtModule.register({ secret: config.jwtAccessSecret })],
  providers: [AuthResolver, AuthService, JwtAccessStrategy, HashPasswordService],
  exports: [JwtAccessStrategy],
})
export class AuthModule {}