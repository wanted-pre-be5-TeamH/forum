import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { IBoard, IBoardId } from './board.interface';

export interface IBoardRepository extends IBaseRepository<IBoardId, IBoard> {
  findOne: (where: { id?: IBoardId; title?: string }) => Promise<IBoard | null>;
}
