import { IBoardProperty } from '../domain/board.interface';

export type CreateBoardDTO = Pick<
  IBoardProperty,
  'title' | 'announcement' | 'read_access' | 'write_access'
>;

export type FindOneBoardDTO = Pick<IBoardProperty, 'id'>;

export type UpdateBoardDTO = Partial<
  Pick<
    IBoardProperty,
    'title' | 'read_access' | 'write_access' | 'announcement'
  >
>;

export type RemoveBoardDTO = Pick<IBoardProperty, 'id'>;
