import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import * as bcrypt from 'bcrypt';
import { IAuth, IAuthId, IAuthProps, IAuthResponse } from './auth.interface';
import { CookieOptions } from 'express';
import { roleLevel, UserRole } from 'src/api/user/domain/user.enum';

export class Auth extends BaseAggregate<IAuthId> implements IAuth {
  private constructor(
    id: IAuthId,
    readonly username: string,
    readonly password: string,
    readonly accessed_at: Date,
    readonly role: UserRole,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static getJwtConfig(): CookieOptions {
    const option: CookieOptions = {
      // maxAge?: number | undefined;
      // signed?: boolean | undefined;
      // expires?: Date | undefined;
      // httpOnly?: boolean | undefined;
      // path?: string | undefined;
      // domain?: string | undefined;
      // secure?: boolean | undefined;
      // encode?: ((val: string) => string) | undefined;
      // sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
    };
    return option;
  }

  static getCookieName() {
    return 'access_token';
  }

  static checkPermission(role: UserRole, permission: UserRole): boolean {
    const level = roleLevel[role];
    const permissionLevel = roleLevel[permission];
    return level <= permissionLevel;
  }

  static get(props: IAuthProps): IAuth {
    const {
      id,
      username,
      password,
      accessed_at,
      role,
      created_at,
      updated_at,
    } = props;
    const now = new Date();
    return new Auth(
      id ?? 0,
      username,
      password,
      accessed_at,
      role,
      created_at ?? now,
      updated_at ?? now,
    );
  }

  getResponse(): IAuthResponse {
    const { id, username, accessed_at, role } = this;
    return { id, username, accessed_at, role };
  }

  authenticate(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  updateAccessedAt(): void {
    (this as any).accessed_at = new Date();
    return;
  }
}
