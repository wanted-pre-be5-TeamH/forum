import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Matches, Max, Min } from 'class-validator';
import { UserGender } from '../domain/user.enum';
import { IUserId, IUserProperty } from '../domain/user.interface';
import { UserErrorMessage } from '../infrastructure/user.entity';

export class FindOneUserParam {
  @IsNumber()
  @Type(() => Number)
  user_id: number;
}

interface ICreateUserBody
  extends Pick<IUserProperty, 'username' | 'birth_year' | 'gender' | 'phone'> {
  password: string;
}

export class CreateUserBody implements ICreateUserBody {
  @IsString({ message: UserErrorMessage.username })
  username: string;

  @Matches(/^[A-Za-z0-9]{6,12}$/, {
    message: UserErrorMessage.password,
  })
  password: string;

  @IsNumber({}, { message: UserErrorMessage.birth })
  @Min(1900, { message: UserErrorMessage.birth })
  @Max(2999, { message: UserErrorMessage.birth })
  birth_year: number;

  @IsEnum(UserGender, { message: UserErrorMessage.gender })
  gender: UserGender;

  @Matches(/^010-([0-9]{4})-([0-9]{4})$/, {
    message: UserErrorMessage.phone,
  })
  phone: string;
}

export type RemoveUserResponse = {
  id: IUserId;
};
