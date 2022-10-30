import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { IUserId, IUserResponse } from 'src/api/user/domain/user.interface';
import { IBoardId, IBoardResponse } from '../../board/domain/board.interface';

export type IPostId = number;

export type IPostResponse = Pick<
  IPostProperty,
  'id' | 'title' | 'writer' | 'created_at' | 'views' | 'updated_at' | 'content'
>;

export type IWriterEntity =
  | Pick<IUserResponse, 'id' | 'username' | 'role'>
  | IUserId
  | null;
export type IBoardEntity = Pick<
  IBoardResponse,
  'id' | 'read_access' | 'write_access' | 'title'
>;

export interface IPostProperty extends BaseAggregate<IPostId> {
  readonly title: string;
  readonly writer: IWriterEntity;
  readonly views: number;
  readonly content: string; // 나중에 uri로 대체
  readonly board: IBoardEntity;
  readonly board_id: IBoardId;
}

export interface IPostMethod {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  getResponse: () => IPostResponse;
}

export type IPost = IPostProperty & IPostMethod;

export type IPostProps = Pick<
  IPostProperty,
  'title' | 'content' | 'writer' | 'board' | 'board_id'
> &
  Partial<Pick<IPostProperty, 'id' | 'created_at' | 'updated_at' | 'views'>>;
