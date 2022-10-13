import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/badrequestexception';
import { AllExceptionsFilter } from './exception/allexception';
import { ApiConfigService } from './config/api-config.service';
import { config } from 'aws-sdk';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const adapter= app.get(HttpAdapterHost)
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new AllExceptionsFilter(adapter));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  })
  const configService = app.get(ApiConfigService);
  config.update({
    accessKeyId: configService.getAWSConfig().accessKey,
    secretAccessKey: configService.getAWSConfig().secretKey,
  });
  await app.listen(3000);
}
bootstrap();
