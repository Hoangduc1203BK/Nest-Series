import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../database/entities';
import { UserService } from 'src/module/user';
import { ApiConfigService } from 'src/config/api-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userService: UserService,
    private readonly configService: ApiConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getAuthConfig().secret,
    });
  }

  async validate(payload: any) {
    const { sub, email } = payload;
    const user = await this.userService.getUserByAuth({ email: email, id: sub})

    if(!user) {
      throw UnauthorizedException;
    }
  }
}
