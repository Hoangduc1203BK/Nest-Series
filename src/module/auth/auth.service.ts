import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { RegisterDto } from './dto/register.dto';
import { ApiConfigService } from '../../config/api-config.service';
import { TOKEN } from '../../const/const';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Token } from '../../database/entities';
import { Repository } from 'typeorm';
import { LoginDto } from './dto';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';
import { resolve } from 'path';

let poolData: ICognitoUserPoolData = {
  UserPoolId: '{userPoolId}',
  ClientId: '{clientId}',
};

// let userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    @InjectRepository(User)
    private readonly userRepos: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepos: Repository<Token>,
    private readonly configService: ApiConfigService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.getCognitoConfig().userPoolID,
      ClientId: this.configService.getCognitoConfig().clientID,
    });
  }

  async register(payload: RegisterDto) {
    // const existUser = await this.userRepos.findOne({ email: payload.email });
    // if (existUser) {
    //   throw new Error('Email already exist');
    // }

    // const result = await this.userRepos.save(payload);
    // result.password = undefined;

    // return result;

    const { name, email,phoneNumber, password } = payload;
    return new Promise(((resolve, reject) => {
      return this.userPool.signUp(name, password, [new CognitoUserAttribute({ Name: 'email', Value: email }), new CognitoUserAttribute( { Name: 'phone_number', Value: phoneNumber})], null, (err, result) => {
        if (!result) {
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    }));
  }

  async authenticate(name: string, password: string) {
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });

    const { userPoolID, clientID } = this.configService.getCognitoConfig();
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolID,
      ClientId: clientID,
    });

    const userData = {
      Username: name,
      Pool: userPool,
    };


    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result)
        },
        onFailure: (err) => {
          reject(err)
        }
      })
    });
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
    };

    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: moment().add(this.configService.getAuthConfig().refreshesTime, 'days').unix(),
    });

    const newToken = this.jwtService.sign(payload);
    await this.tokenRepos.delete(await token);

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
