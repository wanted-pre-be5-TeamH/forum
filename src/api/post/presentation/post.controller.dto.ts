import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { FindManyPostResponseDTO } from '../application/post.service.dto';
import { IPostProperty, IPostResponse } from '../domain/post.interface';

export class FindManyPostQuery {
  @IsNumber({}, { message: '게시판 정보가 필요합니다.' })
  @Type(() => Number)
  board_id: number;
}

export class CreatePostBody
  implements Pick<IPostProperty, 'title' | 'content' | 'board_id'>
{
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  @Type(() => Number)
  board_id: number;
}

export class FindOnePostParam {
  @IsNumber()
  @Type(() => Number)
  post_id: number;
}

export type FindManyPostResponse = {
  [key in keyof FindManyPostResponseDTO]: IPostResponse[];
};

export type RemovePostResponse = Pick<IPostProperty, 'id'>;
