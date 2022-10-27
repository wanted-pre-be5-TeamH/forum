import { BaseAggregate } from 'src/api/common/model/aggregate.base';

export type IAuthId = number;

export interface IAuthProperty extends BaseAggregate<IAuthId> {
  readonly username: string;
  readonly password: string;
  readonly accessed_at: Date;
}

export type IAuthResponse = Pick<
  IAuthProperty,
  'id' | 'username' | 'accessed_at'
>;

export type IAuthMethod = {
  getResponse: () => IAuthResponse;
  authenticte: (password: string) => Promise<boolean>;
  updateAccessedAt: () => void;
};

export type IAuth = IAuthProperty & IAuthMethod;

export type IAuthProps = Omit<IAuthProperty, keyof BaseAggregate<IAuthId>> &
  Partial<BaseAggregate<IAuthId>>;
