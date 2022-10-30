import { Inject, Injectable } from '@nestjs/common';
import { IBoardRepository } from '../domain/repository.interface';
import { BoardRepository } from '../infrastructure/board.repository';
import { BoardFindOneService } from './board.findOne.service';
import { RemoveBoardDTO } from './board.service.dto';
import {
  IBoardFindOneService,
  IBoardRemoveUsecase,
} from './board.service.interface';

@Injectable()
export class BoardRemoveUsecase implements IBoardRemoveUsecase {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
    @Inject(BoardFindOneService)
    private readonly findOne: IBoardFindOneService,
  ) {}

  async execute({ id }: RemoveBoardDTO): Promise<void> {
    const board = await this.findOne.execute({ id });
    return this.boardRepository.remove(board);
  }
}
