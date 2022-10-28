import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { IUser, IUserId } from './user.interface';

export interface IUserRepository extends IBaseRepository<IUserId, IUser> {
  findOne: (where: {
    id?: IUserId;
    username?: string;
  }) => Promise<IUser | null>;

  save: (aggregate: IUser, password?: string) => Promise<IUser>;
}
