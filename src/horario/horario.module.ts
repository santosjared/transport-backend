// horario.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HorarioController } from './horario.controller';
import { HorarioService } from './horario.service';
import { RolesModule } from '../roles/roles.module';  // Asegúrate de importar RolesModule
import { HorarioSchema } from './schema/horario.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Horario', schema: HorarioSchema }]),
    RolesModule,  // Importa RolesModule aquí
  ],
  controllers: [HorarioController],
  providers: [HorarioService,JwtService],
})
export class HorarioModule {}
