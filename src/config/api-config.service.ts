import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get port() {
    return this.configService.get('PORT')
  }
  getDBConfig() {
    return {
      type: 'postgres',
      port: this.configService.get('POSTGRES_PORT'),
      host: this.configService.get('POSTGRES_HOST'),
      database: this.configService.get('POSTGRES_DB'),
      username: this.configService.get('POSTGRES_USER'),
      password: this.configService.get('POSTGRES_PASS'),
    }
  }

  getAuthConfig() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      exprireTime: this.configService.get('JWT_EXPIRATION_TIME'),
      refreshesTime: this.configService.get('JWT_REFRESH_EXPIRATION_DAY_TIME'),
      session: this.configService.get('SESSION_SECRET')
    }
  }

  getAWSConfig() {
    return {
      accessKey: this.configService.get('AWS_ACCESS_KEY'),
      secretKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      bucketName: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      region: this.configService.get('AWS_REGION')
    }
  }

  getRedisConfig() {
    return {
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    }
  }

  getCognitoConfig() {
    const cognitoEnv = {
      userPoolID: this.configService.get('AWS_COGNITO_POOL_ID'),
      clientID: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      region: this.configService.get('AWS_COGNITO_REGION'),
    }

    const authority = `https://cognito-idp.${cognitoEnv.region}.amazonaws.com/${cognitoEnv.userPoolID}`
    return {
      ...cognitoEnv,
      authority
    }
    
    }

    getDynamoConfig() {
      return {
        accessID: this.configService.get('AWS_DYNAMODB_ACCESS_KEY_ID'),
        secretKey: this.configService.get('cQN8PHlIkLN4gtVko5sIsZ3UyHxMVQPTOoSvVQWT'),
        region: this.configService.get('AWS_DYNAMODB_REGION'),
      }
    }
  }

