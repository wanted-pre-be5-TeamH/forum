import { Inject, Injectable } from '@nestjs/common';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { BoardCheckPermissionService } from 'src/api/board/application/board.checkPermission.service';
import { IBoardCheckPermissionService } from 'src/api/board/application/board.service.interface';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { IPostRepository } from '../domain/repository.interface';
import { PostRepository } from '../infrastructure/post.repository';
import { PostFindOneUsecase } from './post.findOne.usecase';
import { FindOnePostDTO } from './post.service.dto';
import {
  IPostFindOneUsecase,
  IPostRemoveUsecase,
} from './post.service.interface';

@Injectable()
export class PostRemoveUsecase implements IPostRemoveUsecase {
  constructor(
    @Inject(PostRepository) private readonly postRepository: IPostRepository,
    @Inject(BoardCheckPermissionService)
    private readonly boardCheckPermission: IBoardCheckPermissionService,
    @Inject(PostFindOneUsecase)
    private readonly postFindOne: IPostFindOneUsecase,
  ) {}

  async execute(auth: IAuthResponse, dto: FindOnePostDTO): Promise<void> {
    const post = await this.postFindOne.execute(auth, dto);
    const writer_id =
      typeof post.writer === 'number' ? post.writer : post.writer?.id;
    if (auth.id != writer_id) {
      throw httpExceptionProvider('403', ExceptionMessage.FBD);
    }
    this.boardCheckPermission.execute(auth, post.board, 'write'); // 자신의 게시물이어도 게시판 쓰기 권한이 없으면 제거할 수 없다.
    return this.postRepository.remove(post);
  }
}
