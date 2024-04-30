import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { DiviceService } from 'src/divice/divice.service';
import { Divice, DiviceSchema } from 'src/divice/schema/divice.schema';
import { CodesService } from 'src/codes/codes.service';
import { Codes, codesSchema } from 'src/codes/schema/codes.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { LogicService } from 'src/logic/logic.service';
import { LocationsService } from 'src/locations/locations.service';
import { Locations, locactionsSchema } from 'src/locations/schema/locations.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Divice.name,
    schema:DiviceSchema
  }]),
  MongooseModule.forFeature([{
    name:Codes.name,
    schema:codesSchema
  }]),
  MongooseModule.forFeature([{
    name:Locations.name,
    schema:locactionsSchema
  }]),
  ScheduleModule.forRoot()
],
  providers: [SocketGateway, SocketService, DiviceService,CodesService, LogicService, LocationsService],
  
})
export class SocketModule {}
