import { ConfirmPasswordDto } from './dto/confirm-password.dto';
import { Controller, Get, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { Request, Response } from 'express';
import { RegisterDto, LoginDto, ConfirmRegistrationDto } from './dto';
import { ApiConfigService } from '../../config/api-config.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ApiConfigService) {}

  // @Post('confirm-registration')
  // async confirmRegistration(@Body() payload: ConfirmRegistrationDto) {
  //   const result = await this.authService.confirmRegistration(payload);

  //   return result;
  // }

  // @Post('resend-confirm-code')
  // async resendConfirmCode(@Body('email') email: string) {
  //   const result = await this.authService.resendCode(email);

  //   return result;
  // }

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    
    const result = await this.authService.register(payload);

    return result;
  }

  // @Post('authenticate')
  // async authenticate(@Body() data: any) {
  //   const result = await this.authService.authenticate(data.name, data.password);

  //   return result;
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginData: LoginDto, @Req() req: Request, @Res() res: Response) {
    const result = await this.authService.login(loginData);
    const exprireTime = this.configService.getAuthConfig().refreshesTime * 24 * 60 * 60 * 1000;
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
      accessToken: result.accessToken,
    };
  }

  // @UseGuards(JwtAuthGuard)
  //   @Post('/change-password')
  //   async changePassword(@Body() data: ChangePasswordDto) {
  //       const result = await this.authService.changePassword(data);

  //       return result;
  //   }

  //   @UseGuards(JwtAuthGuard)
  //   @Post('/forgot-password')
  //   async forgetPassword(@Body('email') email: string) {
  //       const result = await this.authService.forgotPassword(email);

  //       return result;
  //   }

  //   // @UseGuards(JwtAuthGuard)
  //   @Post('/confirm-password')
  //   async confirmPassword(@Body() data: ConfirmPasswordDto) {
  //       const result = await this.authService.confirmNewPassword(data);

  //       return result;
  //   }
}
