import { ChangePasswordDto } from './dto/change-password.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { RegisterDto } from './dto/register.dto';
import { ApiConfigService } from '../../config/api-config.service';
import { TOKEN } from '../../const/const';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Token } from '../../database/entities';
import { Repository } from 'typeorm';
import { ConfirmPasswordDto, ConfirmRegistrationDto, LoginDto } from './dto';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepos: Repository<Token>,
    private readonly configService: ApiConfigService,
  ) {}

  async register(payload: RegisterDto) {
    const existUser = await this.userService.getUserByAuth( { email: payload.email} );
    if (existUser) {
      throw new Error('Email already exist');
    }

    const result = await this.userService.createUser(payload);
    result.password = undefined;

    return result;
  }

  // async confirmRegistration(data: ConfirmRegistrationDto) {
  //   const { email, confirmCode } = data;

  //   const userData ={
  //     Username: email,
  //     Pool: this.userPool,
  //   }

  //   const userPool = new CognitoUser(userData);

  //   return new Promise((resolve, reject) => {
  //     return userPool.confirmRegistration(confirmCode,true,(err)=> {
  //       if(err) {
  //         reject(err);
  //       } else {
  //         resolve(true)
  //       }
  //     });
  //   });
  // }

  // async authenticate(name: string, password: string) {
  //   const authenticationDetails = new AuthenticationDetails({
  //     Username: name,
  //     Password: password,
  //   });

  //   const userData = {
  //     Username: name,
  //     Pool: this.userPool,
  //   };

  //   const newUser = new CognitoUser(userData);

  //   return new Promise((resolve, reject) => {
  //     return newUser.authenticateUser(authenticationDetails, {
  //       onSuccess: (result) => {
  //         resolve(result);
  //       },
  //       onFailure: (err) => {
  //         reject(err);
  //       },
  //     });
  //   });
  // }

  // async changePassword(data: ChangePasswordDto) {
  //   const { email, currentPassword, newPassword } = data;
  //   const authenticationDetails = new AuthenticationDetails({
  //     Username: email,
  //     Password: currentPassword,
  //   });

  //   const userData = {
  //     Username: email,
  //     Pool: this.userPool,
  //   };

  //   const newUser = new CognitoUser(userData);

  //   return new Promise((resolve, reject) => {
  //     return newUser.authenticateUser(authenticationDetails, {
  //       onSuccess: () => {
  //         newUser.changePassword(currentPassword, newPassword, (err, result) => {
  //           if (err) {
  //             reject(err);
  //             return;
  //           }
  //           resolve(result);
  //         });
  //       },
  //       onFailure: (err) => {
  //         reject(err);
  //       },
  //     });
  //   });
  // }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByAuth({ email: email, password});
    return user;
  }

  async login(params: LoginDto) {
    const user = await this.userService.getUser({
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

    const user = await this.userService.getUser({
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

  // async forgotPassword(email: string) {
  //   const userData = {
  //     Username: email,
  //     Pool: this.userPool,
  //   };

  //   const userPool = new CognitoUser(userData);

  //   return new Promise((resolve, reject) => {
  //     return userPool.forgotPassword({
  //       onSuccess: (result) => {
  //         resolve(result);
  //       },
  //       onFailure: (err) => {
  //         reject(err);
  //       },
  //     });
  //   });
  // }


  // async confirmNewPassword(confirmPassword: ConfirmPasswordDto) {
  //   const { email, confirmCode, newPassword } = confirmPassword;

  //   const userData = {
  //     Username: email,
  //     Pool: this.userPool,
  //   };

  //   const userPool = new CognitoUser(userData);

  //   return new Promise((resolve, reject) => {
  //     return userPool.confirmPassword(confirmCode, newPassword,{
  //       onSuccess: (result) => {
  //         resolve(result);
  //       },
  //       onFailure: (err) => {
  //         reject(err);
  //       },
  //     });
  //   });
  // }
}
