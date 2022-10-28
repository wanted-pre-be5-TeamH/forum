import { ValidateUserDTO, FindOneDTO } from './auth.service.dto';
import { IAuth } from '../domain/auth.interface';
import { Inject, Injectable } from '@nestjs/common';
import { httpExceptionProvider } from '../../common/provider/exception.provider';
import { AuthRepository } from '../infrastructure/auth.repository';
import { UserErrorMessage } from '../../user/infrastructure/user.entity';
import { IAuthRepository } from '../domain/repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private readonly authRepository: IAuthRepository,
  ) {}

  async findOne(where: FindOneDTO): Promise<IAuth> {
    const auth = await this.authRepository.findOne(where);
    if (auth == null) {
      throw httpExceptionProvider('401', '존재하지 않는 사용자입니다.');
    }
    auth.updateAccessedAt();
    return this.authRepository.update(auth);
  }

  async validate({ username, password }: ValidateUserDTO): Promise<IAuth> {
    const auth = await this.findOne({ username });
    const authentication = await auth.authenticate(password);
    if (authentication) {
      return auth;
    }
    throw httpExceptionProvider('401', UserErrorMessage.password);
  }
}
