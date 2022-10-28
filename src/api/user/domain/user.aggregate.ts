import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { UserRole, UserGender } from './user.enum';
import {
  IUser,
  IUserDetailResponse,
  IUserId,
  IUserProps,
  IUserResponse,
} from './user.interface';

export class User extends BaseAggregate<IUserId> implements IUser {
  private constructor(
    id: IUserId,
    readonly username: string,
    readonly role: UserRole,
    readonly phone: string,
    readonly gender: UserGender,
    readonly birth_year: number,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: IUserProps): IUser {
    const {
      id,
      username,
      role,
      phone,
      gender,
      birth_year,
      created_at,
      updated_at,
    } = props;
    const now = new Date();
    return new User(
      id ?? 0,
      username,
      role ?? UserRole.Normal,
      phone,
      gender,
      birth_year,
      created_at ?? now,
      updated_at ?? now,
    );
  }

  getResponse(): IUserResponse {
    const { id, username, role } = this;
    return { id, username, role };
  }

  getDetailResponse(): IUserDetailResponse {
    const { id, username, role, birth_year, gender, phone } = this;
    return { id, username, role, birth_year, gender, phone };
  }

  setRole(role: UserRole): void {
    (this as any).role = role;
    return;
  }
}
