import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user.aggregate';
import { IUser } from '../domain/user.interface';
import { IUserRepository } from '../domain/repository.interface';
import { UserRepository } from '../infrastructure/user.repository';
import {
  CreateUserDTO,
  FindOneUserDTO,
  RemoveUserDTO,
} from './user.service.dto';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { UserErrorMessage } from '../infrastructure/user.entity';
import { UserRole } from '../domain/user.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  private encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, 30);
  }

  private async duplicateCheck(username: string): Promise<void> {
    const exist = await this.userRepository.findOne({ username });
    if (exist != null) {
      throw httpExceptionProvider('400', UserErrorMessage.username_unique);
    }
    return;
  }

  async create(dto: CreateUserDTO): Promise<IUser> {
    const { username, phone, birth_year, gender, password } = dto;
    await this.duplicateCheck(username);
    const encrypted = await this.encrypt(password);
    const user = User.get({
      username,
      phone,
      birth_year,
      gender,
    });
    return this.userRepository.save(user, encrypted);
  }

  async findOne({ id }: FindOneUserDTO): Promise<IUser> {
    const user = await this.userRepository.findOne({ id });
    if (user == null) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFound);
    }
    return user;
  }

  async findMany(): Promise<IUser[]> {
    return this.userRepository.findMany();
  }

  async setRole(id: number, role: UserRole): Promise<IUser> {
    const user = await this.findOne({ id });
    user.setRole(role);
    return this.userRepository.save(user);
  }

  async remove({ id }: RemoveUserDTO): Promise<void> {
    const user = await this.findOne({ id });
    return this.userRepository.remove(user);
  }
}
