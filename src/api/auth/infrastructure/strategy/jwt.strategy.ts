import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { AuthService } from '../../application/auth.service';
import { Auth } from '../../domain/auth.aggregate';
import { IAuthResponse } from '../../domain/auth.interface';
import { IJwtPayload } from './jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req.cookies[Auth.getCookieName()] ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    };
    super(options);
  }

  async validate({ id }: IJwtPayload): Promise<IAuthResponse> {
    if (typeof id == 'number') {
      const auth = await this.authService.findOne({ id });
      return auth.getResponse();
    }
    throw httpExceptionProvider('401', '유효하지 않은 인증정보입니다.');
  }
}
