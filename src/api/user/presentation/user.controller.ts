import { IUserDetailResponse, IUserResponse } from '../domain/user.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import {
  CreateUserBody,
  FindOneUserParam,
  RemoveUserResponse,
} from './user.controller.dto';
import { UserResponseInterceptor } from '../infrastructure/user.interceptor';
import { AuthUser } from 'src/api/auth/infrastructure/decorator/auth.decorator';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';

@UseInterceptors(UserResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findMany(): Promise<IUserResponse[]> {
    const users = await this.userService.findMany();
    return users.map((user) => user.getResponse());
  }

  @Get('me')
  async findMe(
    @AuthUser() { id }: IAuthResponse,
  ): Promise<IUserDetailResponse> {
    const user = await this.userService.findOne({ id });
    return user.getDetailResponse();
  }

  @Get(':user_id')
  async findOne(
    @Param() { user_id: id }: FindOneUserParam,
  ): Promise<IUserResponse> {
    const user = await this.userService.findOne({ id });
    return user.getResponse();
  }

  @Post()
  async create(@Body() body: CreateUserBody): Promise<IUserDetailResponse> {
    const { username, password, phone, gender, birth_year } = body;
    const user = await this.userService.create({
      username,
      password,
      phone,
      gender,
      birth_year,
    });
    return user.getDetailResponse();
  }

  @Delete(':user_id')
  async remove(
    @Param() { user_id: id }: FindOneUserParam,
  ): Promise<RemoveUserResponse> {
    await this.userService.remove({ id });
    return { id };
  }
}
