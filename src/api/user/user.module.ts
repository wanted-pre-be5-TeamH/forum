import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './application/user.service';
import { UserEntity } from './infrastructure/user.entity';
import { UserEntityMapper } from './infrastructure/user.mapper';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserEntityMapper, UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule {}
