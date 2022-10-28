import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { UserRole } from 'src/api/user/domain/user.enum';

export type IAuthId = number;

export interface IAuthProperty extends BaseAggregate<IAuthId> {
  readonly username: string;
  readonly password: string;
  readonly accessed_at: Date;
  readonly role: UserRole;
}

export type IAuthResponse = Pick<
  IAuthProperty,
  'id' | 'username' | 'accessed_at' | 'role'
>;

export type IAuthMethod = {
  getResponse: () => IAuthResponse;
  authenticate: (password: string) => Promise<boolean>;
  updateAccessedAt: () => void;
};

export type IAuth = IAuthProperty & IAuthMethod;

export type IAuthProps = Omit<IAuthProperty, keyof BaseAggregate<IAuthId>> &
  Partial<BaseAggregate<IAuthId>>;
