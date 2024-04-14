import { Module } from '@nestjs/common';
import { TarifaService } from './tarifa.service';
import { TarifaController } from './tarifa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarifa, tarifaSchema } from './schema/tarifa.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Tarifa.name,
    schema:tarifaSchema
  }])],
  controllers: [TarifaController],
  providers: [TarifaService],
})
export class TarifaModule {}
