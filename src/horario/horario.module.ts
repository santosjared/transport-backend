// horario.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HorarioController } from './horario.controller';
import { HorarioService } from './horario.service';
import { HorarioSchema } from './schema/horario.schema';
import { JwtService } from '@nestjs/jwt';
import { DaysModule } from 'src/days/days.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Horario', schema: HorarioSchema }]),
    DaysModule,
    UsersModule
  ],
  controllers: [HorarioController],
  providers: [HorarioService,JwtService],
})
export class HorarioModule {}
