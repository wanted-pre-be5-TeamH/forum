import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { IBoardId } from '../../board/domain/board.interface';
import { IPost, IPostId, IPostProperty } from './post.interface';

export interface IPostRepository extends IBaseRepository<IPostId, IPost> {
  findOne: (where: Pick<IPostProperty, 'id'>) => Promise<IPost | null>;
  /** board_id를 전달하지 않으면 공지 사항을 불러옴 */
  findMany: (where?: { board_id: IBoardId }) => Promise<IPost[]>;
  /** 애그리거트를 생성/수정한다. save 후 findOne을 통해 결과를 DB로부터 다시 요청한다.*/
  save: (aggregate: IPost) => Promise<IPost>;
  /** 애그리거트를 수정한다. 해당 id를 가진 애그리거트가 없다면 아무 작업도 하지 않는다.
   * @return 인자로 전달된 값을 그대로 반환한다.
   */
  update: (aggregate: IPost) => Promise<IPost>;
}
