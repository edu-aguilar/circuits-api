import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let app;

NestFactory.create(AppModule).then((_app) => {
  app = _app;
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.listen(process.env.PORT || 3000);
});

module.exports = app;
