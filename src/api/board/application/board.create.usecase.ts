import { Inject, Injectable } from '@nestjs/common';
import { Board } from '../domain/board.aggregate';
import { IBoard } from '../domain/board.interface';
import { IBoardRepository } from '../domain/repository.interface';
import { BoardRepository } from '../infrastructure/board.repository';
import { BoardCheckDuplicateService } from './board.checkDuplicate.service';
import { CreateBoardDTO } from './board.service.dto';
import {
  IBoardCheckDuplicateService,
  IBoardCreateUsecase,
} from './board.service.interface';

@Injectable()
export class BoardCreateUsecase implements IBoardCreateUsecase {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
    @Inject(BoardCheckDuplicateService)
    private readonly checkDuplicate: IBoardCheckDuplicateService,
  ) {}

  async execute(dto: CreateBoardDTO): Promise<IBoard> {
    const { title, announcement, read_access, write_access } = dto;
    await this.checkDuplicate.execute(title);
    const board = Board.get({
      title,
      announcement,
      read_access,
      write_access,
    });
    return this.boardRepository.save(board);
  }
}
