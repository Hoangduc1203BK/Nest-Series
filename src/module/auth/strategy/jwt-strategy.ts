import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities';
import { ApiConfigService } from 'src/config/api-config.service';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepos: Repository<User>,
    private readonly configService: ApiConfigService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${configService.getCognitoConfig().authority}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: configService.getCognitoConfig().authority,
      algorithms: ['RS256']
    });
  }

  async validate(payload: any) {
    console.log(payload);

    return payload;
    // const user = await this.userRepos.findOne({
    //   id: payload.sub,
    //   email: payload.email,
    // });

    // if (!user) {
    //   throw new UnauthorizedException('Unauthorized');
    // }

    // return user;
  }
}
