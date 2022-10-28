import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { Board } from '../domain/board.aggregate';
import { IBoard } from '../domain/board.interface';
import { BoardEntity } from './board.entity';

@Injectable()
export class BoardEntityMapper implements IEntityMapper<IBoard, BoardEntity> {
  toAggregate(entity: BoardEntity): IBoard {
    const {
      id,
      created_at,
      updated_at,
      title,
      announcement,
      read_access,
      write_access,
    } = entity;
    return Board.get({
      id,
      created_at,
      updated_at,
      title,
      announcement,
      read_access,
      write_access,
    });
  }
  toRootEntity(aggregate: IBoard): BoardEntity {
    const { id, title, announcement, read_access, write_access } = aggregate;
    const entity = new BoardEntity();
    if (id != 0) {
      entity.id = id;
    }
    entity.title = title;
    entity.announcement = announcement;
    entity.read_access = read_access;
    entity.write_access = write_access;
    return entity;
  }
}
