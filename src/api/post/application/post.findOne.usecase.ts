import { Inject, Injectable } from '@nestjs/common';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { BoardCheckPermissionService } from 'src/api/board/application/board.checkPermission.service';
import { IBoardCheckPermissionService } from 'src/api/board/application/board.service.interface';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { IPost } from '../domain/post.interface';
import { IPostRepository } from '../domain/repository.interface';
import { PostRepository } from '../infrastructure/post.repository';
import { FindOnePostDTO } from './post.service.dto';
import { IPostFindOneUsecase } from './post.service.interface';

@Injectable()
export class PostFindOneUsecase implements IPostFindOneUsecase {
  constructor(
    @Inject(PostRepository) private readonly postRepository: IPostRepository,
    @Inject(BoardCheckPermissionService)
    private readonly boardCheckPermission: IBoardCheckPermissionService,
  ) {}

  async execute(auth: IAuthResponse, { id }: FindOnePostDTO): Promise<IPost> {
    const post = await this.postRepository.findOne({ id });
    if (post == null) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFound);
    }
    this.boardCheckPermission.execute(auth, post.board, 'read');
    return post;
  }
}
