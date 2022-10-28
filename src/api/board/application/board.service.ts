import { Inject, Injectable } from '@nestjs/common';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { Board } from '../domain/board.aggregate';
import { IBoard, IBoardId } from '../domain/board.interface';
import { IBoardRepository } from '../domain/repository.interface';
import { BoardErrorMessage } from '../infrastructure/board.entity';
import { BoardRepository } from '../infrastructure/board.repository';
import {
  CreateBoardDTO,
  FindOneBoardDTO,
  RemoveBoardDTO,
  UpdateBoardDTO,
} from './board.service.dto';

@Injectable()
export class BoardService {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
  ) {}
  private async duplicateCheck(title: string): Promise<void> {
    const exist = await this.boardRepository.findOne({ title });
    if (exist != null) {
      throw httpExceptionProvider('400', BoardErrorMessage.title_unique);
    }
    return;
  }

  async create(dto: CreateBoardDTO): Promise<IBoard> {
    const { title, announcement, read_access, write_access } = dto;
    await this.duplicateCheck(title);
    const board = Board.get({
      title,
      announcement,
      read_access,
      write_access,
    });
    return this.boardRepository.save(board);
  }

  async findOne({ id }: FindOneBoardDTO): Promise<IBoard> {
    const board = await this.boardRepository.findOne({ id });
    if (board == null) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFound);
    }
    return board;
  }

  async findMany(): Promise<IBoard[]> {
    return this.boardRepository.findMany();
  }

  async update(
    id: IBoardId,
    { title, read_access, write_access, announcement }: UpdateBoardDTO,
  ): Promise<IBoard> {
    const board = await this.findOne({ id });
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

  async remove({ id }: RemoveBoardDTO): Promise<void> {
    const board = await this.findOne({ id });
    return this.boardRepository.remove(board);
  }
}
