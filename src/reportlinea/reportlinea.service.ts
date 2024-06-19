import { Injectable } from '@nestjs/common';
import { CreateReportlineaDto } from './dto/create-reportlinea.dto';
import { UpdateReportlineaDto } from './dto/update-reportlinea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReportLinea, ReportLineaDocument } from './schema/reportlinea.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReportlineaService {
  constructor(@InjectModel(ReportLinea.name) private readonly reportlineaModel:Model<ReportLineaDocument>){}
  async create(createReportlineaDto: CreateReportlineaDto) {
    return await this.reportlineaModel.create(createReportlineaDto);
  }
  async findOne(id: string) {
    const linea = await this.reportlineaModel.findOne({lineaId:id})
    const cantidad = linea.cantidad+1
    return await this.reportlineaModel.findOneAndUpdate({id:linea.id},{cantidad});
  }
  async remove(id: string) {
    return await this.reportlineaModel.findOneAndUpdate({lineaId:id},{delete:false});
  }
}
