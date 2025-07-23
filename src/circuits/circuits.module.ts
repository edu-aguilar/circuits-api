import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CircuitSchema } from './entities/circuit.entity';
import { ProvinceSchema } from 'src/provinces/entities/province.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { CircuitCommentSchema } from './entities/circuitComment.entity';
import { CircuitCommentsService } from './circuitComments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Circuit', schema: CircuitSchema }]),
    MongooseModule.forFeature([{ name: 'Province', schema: ProvinceSchema }]),
    MongooseModule.forFeature([
      { name: 'CircuitComment', schema: CircuitCommentSchema },
    ]),
  ],
  controllers: [CircuitsController],
  providers: [CircuitsService, CircuitCommentsService],
})
export class CircuitsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'circuits', method: RequestMethod.GET },
        { path: 'circuits/:id', method: RequestMethod.GET },
        { path: 'circuits/:id/comments', method: RequestMethod.GET },
      )
      .forRoutes(CircuitsController);
  }
}
