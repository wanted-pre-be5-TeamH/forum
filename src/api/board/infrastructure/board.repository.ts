import { IBoardId } from '../domain/board.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { TypeOrmBaseRepository } from 'src/api/common/provider/repository.base';
import { FindOneOptions, Repository } from 'typeorm';
import { IBoard } from '../domain/board.interface';
import { IBoardRepository } from '../domain/repository.interface';
import { BoardEntity } from './board.entity';
import { BoardEntityMapper } from './board.mapper';

@Injectable()
export class BoardRepository
  extends TypeOrmBaseRepository<IBoard, BoardEntity>
  implements IBoardRepository
{
  constructor(
    @Inject(BoardEntityMapper) mapper: IEntityMapper<IBoard, BoardEntity>,
    @InjectRepository(BoardEntity) repository: Repository<BoardEntity>,
  ) {
    super(mapper, repository);
  }

  async findOne(where: {
    id?: IBoardId;
    title?: string;
  }): Promise<IBoard | null> {
    if (Object.keys(where).length === 0) {
      return null;
    }
    const findOption: FindOneOptions = { where };
    const entity = await this.getRepository().findOne(findOption);
    return entity == null ? null : this.getMapper().toAggregate(entity);
  }
}
