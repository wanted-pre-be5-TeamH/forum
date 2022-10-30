import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { IBoardId } from '../../board/domain/board.interface';
import {
  IBoardEntity,
  IPost,
  IPostId,
  IPostProps,
  IPostResponse,
  IWriterEntity,
} from './post.interface';

export class Post extends BaseAggregate<IPostId> implements IPost {
  private constructor(
    id: IPostId,
    readonly title: string,
    readonly writer: IWriterEntity,
    readonly views: number,
    readonly content: string,
    readonly board: IBoardEntity,
    readonly board_id: IBoardId,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: IPostProps): IPost {
    const {
      id,
      created_at,
      updated_at,
      title,
      writer,
      views,
      content,
      board,
      board_id,
    } = props;
    const now = new Date();
    return new Post(
      id ?? 0,
      title,
      writer,
      views ?? 0,
      content,
      board,
      board_id,
      created_at ?? now,
      updated_at ?? now,
    );
  }

  setTitle(title: string): void {
    (this as any).title = title;
    return;
  }

  setContent(content: string): void {
    (this as any).content = content;
  }

  getResponse(): IPostResponse {
    const { id, title, writer, created_at, views, updated_at, content } = this;
    return { id, title, writer, created_at, views, updated_at, content };
  }
}
