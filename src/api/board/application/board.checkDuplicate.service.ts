import { Inject, Injectable } from '@nestjs/common';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { IBoardRepository } from '../domain/repository.interface';
import { BoardErrorMessage } from '../infrastructure/board.entity';
import { BoardRepository } from '../infrastructure/board.repository';
import { IBoardCheckDuplicateService } from './board.service.interface';

@Injectable()
export class BoardCheckDuplicateService implements IBoardCheckDuplicateService {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
  ) {}

  async execute(title: string): Promise<void> {
    const exist = await this.boardRepository.findOne({ title });
    if (exist != null) {
      throw httpExceptionProvider('400', BoardErrorMessage.title_unique);
    }
    return;
  }
}
