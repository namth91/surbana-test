import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationRepository, LocationService],
  controllers: [LocationController],
  exports: [LocationRepository],
})
export class LocationModule {}
