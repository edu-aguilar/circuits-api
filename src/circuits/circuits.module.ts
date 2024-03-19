import { Module } from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CircuitSchema } from './entities/circuit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Circuit', schema: CircuitSchema }]),
  ],
  controllers: [CircuitsController],
  providers: [CircuitsService],
})
export class CircuitsModule {}
