import { IAuth } from './auth.interface';

export interface IAuthRepository {
  findOne: (where: { username: string }) => Promise<IAuth | null>;
  update: (aggregate: IAuth) => Promise<IAuth | null>;
}
