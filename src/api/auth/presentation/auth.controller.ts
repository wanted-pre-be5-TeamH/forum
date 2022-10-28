import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Auth } from '../domain/auth.aggregate';
import { AuthGuard } from '@nestjs/passport';
import { IAuthResponse } from '../domain/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from 'src/api/auth/infrastructure/decorator/auth.decorator';
import { Public } from '../infrastructure/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  signin(
    @AuthUser() { id }: IAuthResponse,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this.jwtService.sign({ id });
    res.cookie(Auth.getCookieName(), token, Auth.getJwtConfig());
    return { status: 200, access_token: token };
  }

  @Get('sign-out')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(Auth.getCookieName());
    return { status: 200, message: 'successed' };
  }
}
