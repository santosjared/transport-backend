import { Module } from '@nestjs/common';
import { BusmarkerService } from './busmarker.service';
import { BusmarkerController } from './busmarker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusMarker, BusMarkerSchema } from './schema/busmarker.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:BusMarker.name,
    schema:BusMarkerSchema
  }])],
  controllers: [BusmarkerController],
  providers: [BusmarkerService],
  exports:[BusmarkerService]
})
export class BusmarkerModule {}
