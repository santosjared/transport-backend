import { Module } from '@nestjs/common';
import { TarifasService } from './tarifas.service';
import { TarifasController } from './tarifas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarifas, TarifaSchema } from './schema/tarifas.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Tarifas.name,
    schema:TarifaSchema
  }])],
  controllers: [TarifasController],
  providers: [TarifasService],
  exports:[TarifasService]
})
export class TarifasModule {}
