import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CircuitsModule } from './circuits/circuits.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/', {}),
    CircuitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
