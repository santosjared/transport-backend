import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Horario, HorarioDocument } from './schema/horario.schema';
import { Model } from 'mongoose';

@Injectable()
export class HorarioService {
  constructor(@InjectModel(Horario.name) private readonly horarioModel:Model<HorarioDocument>){}
  async create(createHorarioDto: CreateHorarioDto) {
    return await this.horarioModel.create(createHorarioDto);
  }

  async findAll() {
    return await this.horarioModel.find();
  }

  findOne(id: number | string) {
    return this.horarioModel.findOne({id:id});
  }

  update(id: number, updateHorarioDto: UpdateHorarioDto) {
    return `This action updates a #${id} horario`;
  }

  remove(id: number) {
    return `This action removes a #${id} horario`;
  }
}
