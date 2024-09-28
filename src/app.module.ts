import { Module } from '@nestjs/common';
import { CircuitsModule } from './circuits/circuits.module';
import { ProvincesModule } from './provinces/provinces.module';
import { RegionsModule } from './regions/regions.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CircuitsModule,
    ProvincesModule,
    RegionsModule,
  ],
  providers: [AuthMiddleware],
})
export class AppModule {}
