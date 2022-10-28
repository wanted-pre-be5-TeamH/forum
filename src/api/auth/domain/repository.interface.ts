import { IAuth, IAuthId } from './auth.interface';

export interface IAuthRepository {
  findOne: (
    where: { username: string } | { id: IAuthId },
  ) => Promise<IAuth | null>;
  update: (aggregate: IAuth) => Promise<IAuth>;
}
