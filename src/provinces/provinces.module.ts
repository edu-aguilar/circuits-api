import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvinceSchema } from './entities/province.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Province', schema: ProvinceSchema }]),
  ],
  controllers: [ProvincesController],
  providers: [ProvincesService],
})
export class ProvincesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'provinces', method: RequestMethod.GET },
        { path: 'provinces/:id', method: RequestMethod.GET },
      )
      .forRoutes(ProvincesController);
  }
}
