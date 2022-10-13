import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { RegisterDto } from './dto/register.dto';
import { ApiConfigService } from '../../config/api-config.service';
import { TOKEN } from '../../const/const';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Token } from '../../database/entities';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto';

const SALT = 10;
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepos: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepos: Repository<Token>,
    private readonly configService: ApiConfigService,
  ) {}

  async register(payload: RegisterDto) {
    const existUser = await this.userRepos.findOne({ email: payload.email });
    if (existUser) {
      throw new Error('Email already exist');
    }

    const result = await this.userRepos.save(payload);
    result.password = undefined;

    return result;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepos.findOne({ email: email, password: password });
    return user;
  }

  async login(params: LoginDto) {
    const user = await this.userRepos.findOne({
      email: params.email,
      password: params.password,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: moment().add(15, 'days').unix(),
    });

    await this.tokenRepos.save({
      userId: user.id,
      type: TOKEN.REFRESH_TOKEN,
      expires: moment().add(this.configService.getAuthConfig().refreshesTime, 'days').toDate(),
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken) as { sub: number; email: string };
    const token = this.tokenRepos.findOne({
      userId: decoded.sub,
      type: TOKEN.REFRESH_TOKEN,
      blacklisted: false,
      token: refreshToken,
    });

    if (!refreshToken) {
      throw new Error('Unauthorized');
    }

    const user = await this.userRepos.findOne({
      id: decoded.sub,
      email: decoded.email,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const payload = {
        sub: user.id,
        email: user.email,
    }

    const newRefreshToken = this.jwtService.sign(payload, {
        expiresIn: moment().add(this.configService.getAuthConfig().refreshesTime, 'days').unix(),
      });
  
      const newToken = this.jwtService.sign(payload);
      await this.tokenRepos.delete(await token)
  
      await this.tokenRepos.save({
        token: refreshToken,
        userId: user.id,
        type: TOKEN.REFRESH_TOKEN,
        expires: moment().add(this.configService.getAuthConfig().refreshesTime, 'days').toDate(),
      });
  
      return {
        accessToken: newToken,
        refreshToken: newRefreshToken,
      };
  }
}
