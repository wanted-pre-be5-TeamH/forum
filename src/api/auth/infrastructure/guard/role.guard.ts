import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { UserRole } from 'src/api/user/domain/user.enum';
import { Auth } from '../../domain/auth.aggregate';
import { IAuthResponse } from '../../domain/auth.interface';
import { ROLES_KEY } from '../constant/roles-key.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (permission == undefined) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as IAuthResponse;

    if (user == undefined) {
      throw httpExceptionProvider('403', ExceptionMessage.FBD);
    } // Public인데, 권한을 요구하는 경우 => 설계 오류!

    if (Auth.checkPermission(user.role, permission)) {
      return true;
    }
    throw httpExceptionProvider('403', ExceptionMessage.FBD);
  }
}
