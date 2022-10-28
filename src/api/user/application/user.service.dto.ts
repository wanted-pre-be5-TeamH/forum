import { IUserProperty } from '../domain/user.interface';

export type CreateUserDTO = Pick<
  IUserProperty,
  'username' | 'phone' | 'birth_year' | 'gender'
> & { readonly password: string };

export type FindOneUserDTO = Pick<IUserProperty, 'id'>;

export type SetRoleDTO = Pick<IUserProperty, 'id' | 'role'>;

export type RemoveUserDTO = Pick<IUserProperty, 'id'>;
