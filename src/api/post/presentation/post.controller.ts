import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { AuthUser } from 'src/api/auth/infrastructure/decorator/auth.decorator';
import { PostCreateUsecase } from '../application/post.create.usecase';
import { PostFindManyUsecase } from '../application/post.findMany.usecase';
import { PostFindOneUsecase } from '../application/post.findOne.usecase';
import { PostRemoveUsecase } from '../application/post.remove.usecase';
import {
  IPostCreateUsecase,
  IPostFindManyUsecase,
  IPostFindOneUsecase,
  IPostRemoveUsecase,
} from '../application/post.service.interface';
import { IPostResponse } from '../domain/post.interface';
import { PostResponseInterceptor } from '../infrastructure/post.interceptor';
import {
  CreatePostBody,
  FindManyPostQuery,
  FindManyPostResponse,
  FindOnePostParam,
  RemovePostResponse,
} from './post.controller.dto';

@UseInterceptors(PostResponseInterceptor)
@Controller('post')
export class PostController {
  constructor(
    @Inject(PostFindManyUsecase)
    private readonly findManyUsecase: IPostFindManyUsecase,
    @Inject(PostCreateUsecase)
    private readonly createUsecase: IPostCreateUsecase,
    @Inject(PostFindOneUsecase)
    private readonly findOneUsecase: IPostFindOneUsecase,
    @Inject(PostRemoveUsecase)
    private readonly removeUsecase: IPostRemoveUsecase,
  ) {}

  @Get()
  async findMany(
    @AuthUser() auth: IAuthResponse,
    @Query() { board_id }: FindManyPostQuery,
  ): Promise<FindManyPostResponse> {
    const { announcement, post } = await this.findManyUsecase.execute(auth, {
      board_id,
    });
    return {
      announcement: announcement.map((v) => v.getResponse()),
      post: post.map((v) => v.getResponse()),
    };
  }

  @Post()
  async create(
    @AuthUser() auth: IAuthResponse,
    @Body() body: CreatePostBody,
  ): Promise<IPostResponse> {
    const { title, content, board_id } = body;
    const post = await this.createUsecase.execute(auth, {
      title,
      content,
      board_id,
    });
    return post.getResponse();
  }

  @Get(':post_id')
  async findOne(
    @AuthUser() auth: IAuthResponse,
    @Param() { post_id: id }: FindOnePostParam,
  ): Promise<IPostResponse> {
    const post = await this.findOneUsecase.execute(auth, { id });
    return post.getResponse();
  }

  @Delete(':post_id')
  async remove(
    @AuthUser() auth: IAuthResponse,
    @Param() { post_id: id }: FindOnePostParam,
  ): Promise<RemovePostResponse> {
    await this.removeUsecase.execute(auth, { id });
    return { id };
  }
}
