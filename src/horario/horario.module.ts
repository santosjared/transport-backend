import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Horario, HorarioSchema } from './schema/horario.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Horario.name,
    schema:HorarioSchema
  }])],
  controllers: [HorarioController],
  providers: [HorarioService]
})
export class HorarioModule {}
