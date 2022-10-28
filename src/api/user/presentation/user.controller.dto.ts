import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Matches, Max, Min } from 'class-validator';
import { IAuthProperty } from 'src/api/auth/domain/auth.interface';
import { UserGender, UserRole } from '../domain/user.enum';
import { IUserId, IUserProperty } from '../domain/user.interface';
import { UserErrorMessage } from '../infrastructure/user.entity';

export class FindOneUserParam {
  @IsNumber()
  @Type(() => Number)
  user_id: number;
}

type ICreateUserBody = Pick<
  IUserProperty,
  'username' | 'birth_year' | 'gender' | 'phone'
> &
  Pick<IAuthProperty, 'password'>;

export class CreateUserBody implements ICreateUserBody {
  @IsString({ message: UserErrorMessage.username })
  username: string;

  @Matches(/^[A-Za-z0-9]{6,12}$/, {
    message: UserErrorMessage.password_regex,
  })
  password: string;

  @IsNumber({}, { message: UserErrorMessage.birth })
  @Min(1900, { message: UserErrorMessage.birth })
  @Max(2900, { message: UserErrorMessage.birth })
  @Type(() => Number)
  birth_year: number;

  @IsEnum(UserGender, { message: UserErrorMessage.gender })
  gender: UserGender;

  @Matches(/^010-([0-9]{4})-([0-9]{4})$/, {
    message: UserErrorMessage.phone_regex,
  })
  phone: string;
}

type IUpdateUserBody = Pick<IUserProperty, 'id' | 'role'>;

export class UpdateUserBody implements IUpdateUserBody {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsEnum(UserRole, { message: UserErrorMessage.role })
  role: UserRole;
}

type IRemoveUserBody = Pick<IAuthProperty, 'username' | 'password'>;

export class RemoveUserBody implements IRemoveUserBody {
  @IsString({ message: UserErrorMessage.username })
  username: string;
  @IsString({ message: UserErrorMessage.password })
  password: string;
}

export type RemoveUserResponse = {
  id: IUserId;
};
