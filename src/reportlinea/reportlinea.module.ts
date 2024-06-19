import { Module } from '@nestjs/common';
import { ReportlineaService } from './reportlinea.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportLinea, reportlineaSchema } from './schema/reportlinea.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:ReportLinea.name,
    schema:reportlineaSchema
  }])],
  providers: [ReportlineaService],
})
export class ReportlineaModule {}
