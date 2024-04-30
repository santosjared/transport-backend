import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Locations, locactionsSchema } from './schema/locations.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Locations.name,
    schema:locactionsSchema
  }])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
