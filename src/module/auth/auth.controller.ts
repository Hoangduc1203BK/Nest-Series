import { Controller, Get, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { Request, Response } from 'express';
import { RegisterDto, LoginDto } from './dto';
import { ApiConfigService } from '../../config/api-config.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ApiConfigService
    ) {}

    @Post('register')
    async register(@Body() payload: RegisterDto) {
      const result = await this.authService.register(payload);

      return result
    }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginData: LoginDto, @Req() req: Request, @Res() res: Response) {
    const result = await this.authService.login(loginData);
    const exprireTime= this.configService.getAuthConfig().refreshesTime * 24 * 60 * 60 * 1000;
    res.cookie('refresh_token', result.refreshToken, {
      maxAge: exprireTime,
      httpOnly: true,
    });

    return res.json(result);
  }

  @Post('/refresh-token')
  async refreshToken(@Req() req: Request, @Body('refreshToken') refreshToken: string) {
    const result = await this.authService.refreshToken(refreshToken);

    return {
      accessToken: result.accessToken
    }
  }
}
