import { IAuthId } from '../domain/auth.interface';

export type ValidateUserDTO = {
  username: string;
  password: string;
};

export type FindOneDTO = { id: IAuthId } | { username: string };
