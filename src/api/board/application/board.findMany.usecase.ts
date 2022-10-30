import { Inject, Injectable } from '@nestjs/common';
import { IBoard } from '../domain/board.interface';
import { IBoardRepository } from '../domain/repository.interface';
import { BoardRepository } from '../infrastructure/board.repository';
import { IBoardFindManyUsecase } from './board.service.interface';

@Injectable()
export class BoardFindManyUsecase implements IBoardFindManyUsecase {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
  ) {}

  execute(): Promise<IBoard[]> {
    return this.boardRepository.findMany();
  }
}
