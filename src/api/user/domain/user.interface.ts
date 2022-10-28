import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { UserGender, UserRole } from './user.enum';

export type IUserId = number;

export type IUserResponse = Pick<IUserProperty, 'id' | 'username' | 'role'>;
export type IUserDetailResponse = Pick<
  IUserProperty,
  'id' | 'username' | 'birth_year' | 'gender' | 'phone' | 'role'
>;

export interface IUserProperty extends BaseAggregate<IUserId> {
  readonly username: string;
  readonly role: UserRole;
  readonly birth_year: number;
  readonly gender: UserGender;
  readonly phone: string;
}

export type IUserMethod = {
  setRole: (role: UserRole) => void;
  getResponse: () => IUserResponse;
  getDetailResponse: () => IUserDetailResponse;
};

export type IUser = IUserProperty & IUserMethod;

export type IUserProps = Pick<
  IUserProperty,
  'birth_year' | 'gender' | 'phone' | 'username'
> &
  Partial<Pick<IUserProperty, 'id' | 'created_at' | 'updated_at' | 'role'>>;
