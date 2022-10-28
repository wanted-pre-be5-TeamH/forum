import { IUserDetailResponse, IUserResponse } from '../domain/user.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import {
  CreateUserBody,
  FindOneUserParam,
  RemoveUserBody,
  RemoveUserResponse,
  UpdateUserBody,
} from './user.controller.dto';
import { UserResponseInterceptor } from '../infrastructure/user.interceptor';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { UserRole } from '../domain/user.enum';
import { Public } from 'src/api/auth/infrastructure/decorator/public.decorator';
import { AuthService } from 'src/api/auth/application/auth.service';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { AuthUser } from 'src/api/auth/infrastructure/decorator/auth.decorator';
import { Permission } from 'src/api/auth/infrastructure/decorator/permission.decorator';

@UseInterceptors(UserResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Permission(UserRole.Admin)
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

  @Permission(UserRole.Admin)
  @Get(':user_id')
  async findOne(
    @Param() { user_id: id }: FindOneUserParam,
  ): Promise<IUserResponse> {
    const user = await this.userService.findOne({ id });
    return user.getResponse();
  }

  @Public()
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

  @Permission(UserRole.Admin)
  @Patch(':user_id')
  async setRole(
    @Param() { user_id }: FindOneUserParam,
    @Body() { role }: UpdateUserBody,
  ): Promise<IUserResponse> {
    const user = await this.userService.setRole({ id: user_id, role });
    return user.getResponse();
  }

  @Delete()
  async remove(
    @AuthUser() auth: IAuthResponse,
    @Body() { username, password }: RemoveUserBody,
  ): Promise<RemoveUserResponse> {
    if (auth.username !== username) {
      throw httpExceptionProvider('403', ExceptionMessage.FBD);
    }
    const { id } = await this.authService.validate({ username, password });
    await this.userService.remove({ id });
    return { id };
  }
}
