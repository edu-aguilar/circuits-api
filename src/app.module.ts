import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CircuitsModule } from './circuits/circuits.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvincesModule } from './provinces/provinces.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/', {}),
    CircuitsModule,
    ProvincesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
