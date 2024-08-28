import { Module } from '@nestjs/common';
import { BusstatusService } from './busstatus.service';
import { BusstatusController } from './busstatus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusStatus, BusStatusSchema } from './schema/busstatus.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:BusStatus.name,
    schema:BusStatusSchema
  }])],
  controllers: [BusstatusController],
  providers: [BusstatusService],
  exports:[BusstatusService]
})
export class BusstatusModule {}
