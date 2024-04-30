import { Injectable } from '@nestjs/common';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Linea, LineaDocument } from './schema/linea.schema';
import { Model } from 'mongoose';

@Injectable()
export class LineaService {
  constructor(@InjectModel(Linea.name)private readonly lineModel:Model<LineaDocument>){}
  async create(createLineaDto: CreateLineaDto) {
    return await this.lineModel.create(createLineaDto);
  }

  async findAll() {
    return await this.lineModel.find();
  }

  async findOne(id: number | string) {
    return await this.lineModel.findOne({id:id});
  }

  update(id: number, updateLineaDto: UpdateLineaDto) {
    return `This action updates a #${id} linea`;
  }

  remove(id: number) {
    return `This action removes a #${id} linea`;
  }
}
