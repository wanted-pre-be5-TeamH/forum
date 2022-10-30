import { Inject, Injectable } from '@nestjs/common';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { IBoard } from '../domain/board.interface';
import { IBoardRepository } from '../domain/repository.interface';
import { BoardRepository } from '../infrastructure/board.repository';
import { FindOneBoardDTO } from './board.service.dto';
import { IBoardFindOneService } from './board.service.interface';

@Injectable()
export class BoardFindOneService implements IBoardFindOneService {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
  ) {}

  async execute({ id }: FindOneBoardDTO): Promise<IBoard> {
    const board = await this.boardRepository.findOne({ id });
    if (board == null) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFound);
    }
    return board;
  }
}
