import { Injectable } from '@nestjs/common';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tarifa, TarifaDocument } from './schema/tarifa.schema';
import { Model } from 'mongoose';

@Injectable()
export class TarifaService {
  constructor(@InjectModel(Tarifa.name) private readonly tarifaModel:Model<TarifaDocument>){}
  async create(createTarifaDto: CreateTarifaDto) {
    return await this.tarifaModel.create(createTarifaDto);
  }

  async findAll() {
    return await this.tarifaModel.find();
  }

  async findOne(id: number| string) {
    return await this.tarifaModel.findOne({id:id});
  }

  update(id: number, updateTarifaDto: UpdateTarifaDto) {
    return `This action updates a #${id} tarifa`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarifa`;
  }
}
