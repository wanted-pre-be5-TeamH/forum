import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import * as bcrypt from 'bcrypt';
import { IAuth, IAuthId, IAuthProps, IAuthResponse } from './auth.interface';
import { CookieOptions } from 'express';

export class Auth extends BaseAggregate<IAuthId> implements IAuth {
  private constructor(
    id: IAuthId,
    readonly username: string,
    readonly password: string,
    readonly accessed_at: Date,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static getJwtConfig(): CookieOptions {
    return {
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
  }

  static getCookieName() {
    return 'access_token';
  }

  static get(props: IAuthProps): IAuth {
    const { id, username, password, accessed_at, created_at, updated_at } =
      props;
    const now = new Date();
    return new Auth(
      id ?? 0,
      username,
      password,
      accessed_at,
      created_at ?? now,
      updated_at ?? now,
    );
  }

  getResponse(): IAuthResponse {
    const { id, username, accessed_at } = this;
    return { id, username, accessed_at };
  }

  authenticte(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  updateAccessedAt(): void {
    (this as any).accessed_at = new Date();
    return;
  }
}
