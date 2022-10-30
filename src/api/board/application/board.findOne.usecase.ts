import { Inject, Injectable } from '@nestjs/common';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { IBoard } from '../domain/board.interface';
import { BoardCheckPermissionService } from './board.checkPermission.service';
import { BoardFindOneService } from './board.findOne.service';
import { FindOneBoardDTO } from './board.service.dto';
import {
  IBoardCheckPermissionService,
  IBoardFindOneService,
  IBoardFindOneUsecase,
} from './board.service.interface';

@Injectable()
export class BoardFindOneUsecase implements IBoardFindOneUsecase {
  constructor(
    @Inject(BoardFindOneService)
    private readonly findOne: IBoardFindOneService,
    @Inject(BoardCheckPermissionService)
    private readonly checkPermission: IBoardCheckPermissionService,
  ) {}

  async execute(auth: IAuthResponse, { id }: FindOneBoardDTO): Promise<IBoard> {
    const board = await this.findOne.execute({ id });
    this.checkPermission.execute(auth, board, 'read');
    return board;
  }
}
