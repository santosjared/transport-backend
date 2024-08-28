import { Module } from '@nestjs/common';
import { LineaService } from './linea.service';
import { LineaController } from './linea.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Linea, LineaSchema } from './schema/linea.schema';
import { Horario, HorarioSchema } from 'src/horario/schema/horario.schema';
import { Rate, rateSchema } from 'src/rate/schema/rate.schema';
import { Bus, busSchema } from 'src/bus/schema/bus.schema';
import { Road, RoadSchema } from 'src/road/schema/road.schema';
import { BusmarkerModule } from 'src/busmarker/busmarker.module';
import { BustypeModule } from 'src/bustype/bustype.module';
import { BusstatusModule } from 'src/busstatus/busstatus.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Linea.name,
    schema:LineaSchema
  }]),
  MongooseModule.forFeature([{
    name:Horario.name,
    schema:HorarioSchema
  }]),
  MongooseModule.forFeature([{
    name:Rate.name,
    schema:rateSchema
  }]),
  MongooseModule.forFeature([{
    name:Bus.name,
    schema:busSchema
  }]),
  MongooseModule.forFeature([{
    name:Road.name,
    schema:RoadSchema
  }]),
  BusmarkerModule,
  BustypeModule,
  BusstatusModule,
  UsersModule
],
  controllers: [LineaController],
  providers: [LineaService],
})
export class LineaModule {}
