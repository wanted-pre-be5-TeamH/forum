import { RolesGuard } from './infrastructure/guard/role.guard';
import { JwtAuthGuard } from './infrastructure/guard/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './application/auth.service';
import { LocalStrategy } from './infrastructure/strategy/local.strategy';
import { JwtStrategy } from './infrastructure/strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/infrastructure/user.entity';
import { AuthController } from './presentation/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthMapper } from './infrastructure/auth.mapper';
import { AuthRepository } from './infrastructure/auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnv, true>) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRESIN') },
        };
      },
    }),
  ],
  providers: [
    AuthMapper,
    AuthRepository,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 먼저 적용된다.
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
