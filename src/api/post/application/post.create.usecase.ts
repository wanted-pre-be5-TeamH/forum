import { Inject, Injectable } from '@nestjs/common';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { BoardCheckPermissionService } from 'src/api/board/application/board.checkPermission.service';
import { BoardFindOneService } from 'src/api/board/application/board.findOne.service';
import {
  IBoardCheckPermissionService,
  IBoardFindOneService,
} from 'src/api/board/application/board.service.interface';
import { Post } from '../domain/post.aggregate';
import { IPost } from '../domain/post.interface';
import { IPostRepository } from '../domain/repository.interface';
import { PostRepository } from '../infrastructure/post.repository';
import { CreatePostDTO } from './post.service.dto';
import { IPostCreateUsecase } from './post.service.interface';

@Injectable()
export class PostCreateUsecase implements IPostCreateUsecase {
  constructor(
    @Inject(PostRepository) private readonly postRepository: IPostRepository,
    @Inject(BoardFindOneService)
    private readonly boardFindOne: IBoardFindOneService,
    @Inject(BoardCheckPermissionService)
    private readonly boardCheckPermission: IBoardCheckPermissionService,
  ) {}

  async execute(auth: IAuthResponse, dto: CreatePostDTO): Promise<IPost> {
    const { board_id, content, title } = dto;
    const board = await this.boardFindOne.execute({ id: board_id });
    this.boardCheckPermission.execute(auth, board, 'write');
    const post = Post.get({ title, content, board, board_id, writer: auth.id });
    return this.postRepository.save(post);
  }
}
