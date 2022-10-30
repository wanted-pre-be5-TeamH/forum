import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { IService } from 'src/api/common/interface/service.interface';
import { IPost } from '../domain/post.interface';
import {
  CreatePostDTO,
  FindManyPostDTO,
  FindManyPostResponseDTO,
  FindOnePostDTO,
} from './post.service.dto';

export type IPostUsecase<Parameters extends unknown[], Response> = IService<
  Parameters,
  Promise<Response>
>;

export type IPostUsecaseWithAuth<
  Parameters extends unknown[],
  Response,
> = IPostUsecase<[IAuthResponse, ...Parameters], Response>;

export type IPostFindOneUsecase = IPostUsecaseWithAuth<[FindOnePostDTO], IPost>;

export type IPostFindManyUsecase = IPostUsecaseWithAuth<
  [FindManyPostDTO],
  FindManyPostResponseDTO
>;

export type IPostCreateUsecase = IPostUsecaseWithAuth<[CreatePostDTO], IPost>;

export type IPostRemoveUsecase = IPostUsecaseWithAuth<[FindOnePostDTO], void>;
