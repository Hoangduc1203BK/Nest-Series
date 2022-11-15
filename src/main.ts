import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/badrequestexception';
import { AllExceptionsFilter } from './exception/allexception';
import { ApiConfigService } from './config/api-config.service';
import { config } from 'aws-sdk';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { initAdapter } from './event/init-adapter';
import * as dynamo from 'dynamodb';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
  app.useStaticAssets(join(__dirname,'..', 'client'))
  const adapter= app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(adapter));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  })
  const configService = app.get(ApiConfigService);
  config.update({
    accessKeyId: configService.getDynamoConfig().accessID,
    secretAccessKey: configService.getDynamoConfig().secretKey,
    region: configService.getDynamoConfig().region,
  });

  

  await initAdapter(app); 
  await app.listen(configService.port);
}
bootstrap();
