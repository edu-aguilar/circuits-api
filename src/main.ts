import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kinde } from './auth/Kinde';

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');

  const expressApp = app.getHttpAdapter().getInstance();
  const kinde = new Kinde(config);
  kinde.setup(expressApp);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(port || 4000);
}

bootstrap();
