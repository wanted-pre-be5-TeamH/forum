import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { TypeOrmBaseRepository } from 'src/api/common/provider/repository.base';
import { FindOptionsSelect, Repository } from 'typeorm';
import { IBoardId } from '../../board/domain/board.interface';
import { IPost, IPostProperty } from '../domain/post.interface';
import { IPostRepository } from '../domain/repository.interface';
import { PostEntity } from './post.entity';
import { PostEntityMapper } from './post.mapper';

@Injectable()
export class PostRepository
  extends TypeOrmBaseRepository<IPost, PostEntity>
  implements IPostRepository
{
  constructor(
    @Inject(PostEntityMapper) mapper: IEntityMapper<IPost, PostEntity>,
    @InjectRepository(PostEntity) repository: Repository<PostEntity>,
  ) {
    super(mapper, repository);
  }

  private select: FindOptionsSelect<PostEntity> = {
    writer: { id: true, username: true, role: true },
    board: { id: true, read_access: true, write_access: true },
  };

  async findOne({ id }: Pick<IPostProperty, 'id'>): Promise<IPost | null> {
    const entity = await this.getRepository().findOne({
      where: { id },
      select: this.select,
      relations: { writer: true, board: true },
    });
    return entity == null ? null : this.getMapper().toAggregate(entity);
  }

  async findMany(where?: { board_id: IBoardId }): Promise<IPost[]> {
    const list = await this.getRepository().find({
      ...(where == undefined
        ? { where: { board: { announcement: true } } }
        : { where }),
      select: this.select,
      relations: { writer: true, board: true },
    });

    return list.map(this.getMapper().toAggregate);
  }

  async save(aggregate: IPost): Promise<IPost> {
    const { id } = await this.getRepository().save(
      this.getMapper().toRootEntity(aggregate),
    );
    return this.findOne({ id }) as Promise<IPost>;
  }

  async update(aggregate: IPost): Promise<IPost> {
    const entity = this.getMapper().toRootEntity(aggregate);
    await this.getRepository().update(entity.id, entity);
    return aggregate;
  }
}
