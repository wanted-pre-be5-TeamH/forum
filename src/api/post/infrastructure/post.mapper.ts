import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { Post } from '../domain/post.aggregate';
import { IBoardEntity, IPost, IWriterEntity } from '../domain/post.interface';
import { PostEntity } from './post.entity';

@Injectable()
export class PostEntityMapper implements IEntityMapper<IPost, PostEntity> {
  toAggregate(entity: PostEntity): IPost {
    const {
      id,
      created_at,
      updated_at,
      title,
      writer,
      board,
      views,
      content,
      board_id,
    } = entity;
    const writerEntity: IWriterEntity =
      writer != null
        ? {
            id: writer.id,
            username: writer.username,
            role: writer.role,
          }
        : null;
    const boardEntity: IBoardEntity = {
      id: board.id,
      title: board.title,
      read_access: board.read_access,
      write_access: board.write_access,
    };
    return Post.get({
      id,
      content,
      created_at,
      updated_at,
      title,
      writer: writerEntity,
      board: boardEntity,
      board_id,
      views,
    });
  }
  toRootEntity(aggregate: IPost): PostEntity {
    const { id, title, board_id, content, writer } = aggregate;
    const entity = new PostEntity();
    if (id != 0) {
      entity.id = id;
    }
    if (typeof writer === 'number') {
      entity.writer_id = writer;
    } else if (writer != null) {
      entity.writer_id = writer.id;
    }
    entity.board_id = board_id;
    entity.title = title;
    entity.content = content;
    return entity;
  }
}
