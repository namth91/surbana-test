import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configDatabase from './config/database.config';
import { configValidation } from './config/config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configDatabase],
      validationSchema: configValidation,
    }),
    DatabaseModule,
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
