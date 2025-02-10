import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionSchema } from './entities/region.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Region', schema: RegionSchema }]),
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'regions', method: RequestMethod.GET },
        { path: 'regions/:id', method: RequestMethod.GET },
      )
      .forRoutes(RegionsController);
  }
}
