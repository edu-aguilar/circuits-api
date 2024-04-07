import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionSchema } from './entities/region.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Region', schema: RegionSchema }]),
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
