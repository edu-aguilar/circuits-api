import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvinceSchema } from './entities/province.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Province', schema: ProvinceSchema }]),
  ],
  controllers: [ProvincesController],
  providers: [ProvincesService],
})
export class ProvincesModule {}
