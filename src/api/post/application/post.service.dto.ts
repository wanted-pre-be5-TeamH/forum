import { IPost, IPostProperty } from '../domain/post.interface';

export type FindOnePostDTO = Pick<IPostProperty, 'id'>;

export type FindManyPostDTO = Pick<IPostProperty, 'board_id'>;

export type CreatePostDTO = Pick<
  IPostProperty,
  'title' | 'content' | 'board_id'
>;

export type FindManyPostResponseDTO = {
  announcement: IPost[];
  post: IPost[];
};
