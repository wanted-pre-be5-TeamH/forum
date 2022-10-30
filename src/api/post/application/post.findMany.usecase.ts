import { Inject, Injectable } from '@nestjs/common';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { BoardCheckPermissionService } from 'src/api/board/application/board.checkPermission.service';
import { IBoardCheckPermissionService } from 'src/api/board/application/board.service.interface';
import { IPostRepository } from '../domain/repository.interface';
import { PostRepository } from '../infrastructure/post.repository';
import { FindManyPostDTO, FindManyPostResponseDTO } from './post.service.dto';
import { IPostFindManyUsecase } from './post.service.interface';

@Injectable()
export class PostFindManyUsecase implements IPostFindManyUsecase {
  constructor(
    @Inject(PostRepository) private readonly postRepository: IPostRepository,
    @Inject(BoardCheckPermissionService)
    private readonly boardCheckPermission: IBoardCheckPermissionService,
  ) {}

  async execute(
    auth: IAuthResponse,
    where: FindManyPostDTO,
  ): Promise<FindManyPostResponseDTO> {
    const [announcement, post] = await Promise.all([
      this.postRepository.findMany(),
      this.postRepository.findMany(where),
    ]);
    if (post.length > 0) {
      this.boardCheckPermission.execute(auth, post[0].board, 'read');
    }
    return { announcement, post };
  }
}
