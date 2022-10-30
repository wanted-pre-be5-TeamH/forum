import { Inject, Injectable } from '@nestjs/common';
import { IBoard, IBoardId } from '../domain/board.interface';
import { IBoardRepository } from '../domain/repository.interface';
import { BoardRepository } from '../infrastructure/board.repository';
import { BoardFindOneService } from './board.findOne.service';
import { UpdateBoardDTO } from './board.service.dto';
import {
  IBoardFindOneService,
  IBoardUpdateUsecase,
} from './board.service.interface';

@Injectable()
export class BoardUpdateUsecase implements IBoardUpdateUsecase {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
    @Inject(BoardFindOneService)
    private readonly findOne: IBoardFindOneService,
  ) {}
  async execute(id: IBoardId, dto: UpdateBoardDTO): Promise<IBoard> {
    const board = await this.findOne.execute({ id });
    const { title, read_access, write_access, announcement } = dto;
    if (title) {
      board.setTitle(title);
    }
    if (read_access) {
      board.setReadAccess(read_access);
    }
    if (write_access) {
      board.setWriteAccess(write_access);
    }
    if (announcement != null) {
      board.setAnnouncement(announcement);
    }
    return this.boardRepository.save(board);
  }
}
