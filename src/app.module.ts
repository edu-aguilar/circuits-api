import { Module } from '@nestjs/common';
import { CircuitsModule } from './circuits/circuits.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvincesModule } from './provinces/provinces.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      dbName: 'circuits-api',
    }),
    CircuitsModule,
    ProvincesModule,
    RegionsModule,
  ],
})
export class AppModule {}
