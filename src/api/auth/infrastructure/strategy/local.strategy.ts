import {
  IStrategyOptions,
  IStrategyOptionsWithRequest,
  Strategy,
} from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthResponse } from '../../domain/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    const option: IStrategyOptions | IStrategyOptionsWithRequest = {};
    super(option);
  }

  async validate(username: string, password: string): Promise<IAuthResponse> {
    const auth = await this.authService.validate({ username, password });
    return auth.getResponse();
  }
}
