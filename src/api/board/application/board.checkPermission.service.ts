import { Injectable } from '@nestjs/common';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { Board } from '../domain/board.aggregate';
import { IBoardResponse } from '../domain/board.interface';
import { IBoardCheckPermissionService } from './board.service.interface';

@Injectable()
export class BoardCheckPermissionService
  implements IBoardCheckPermissionService
{
  execute(
    user: IAuthResponse,
    board: IBoardResponse,
    scope: 'read' | 'write',
  ): void {
    const permission =
      scope === 'read' ? board.read_access : board.write_access;
    if (!Board.checkPermission(user.role, permission)) {
      throw httpExceptionProvider('403', ExceptionMessage.FBD);
    }
    return;
  }
}
