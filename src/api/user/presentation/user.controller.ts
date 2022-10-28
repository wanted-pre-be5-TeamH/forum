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
import { AuthUser } from 'src/api/auth/infrastructure/decorator/auth.decorator';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { Roles } from 'src/api/auth/infrastructure/decorator/role.decorator';
import { UserRole } from '../domain/user.enum';
import { Public } from 'src/api/auth/infrastructure/decorator/public.decorator';
import { AuthService } from 'src/api/auth/application/auth.service';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';

@UseInterceptors(UserResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Roles(UserRole.Admin)
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

  @Roles(UserRole.Admin)
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

  @Roles(UserRole.Admin)
  @Patch()
  async setRole(@Body() { id, role }: UpdateUserBody): Promise<IUserResponse> {
    const user = await this.userService.setRole({ id, role });
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
