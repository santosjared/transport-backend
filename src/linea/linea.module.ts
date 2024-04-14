import { Module } from '@nestjs/common';
import { LineaService } from './linea.service';
import { LineaController } from './linea.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Linea, LineaSchema } from './schema/linea.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Linea.name,
    schema:LineaSchema
  }])],
  controllers: [LineaController],
  providers: [LineaService],
})
export class LineaModule {}
