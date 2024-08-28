import { Injectable } from '@nestjs/common';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tarifas, TarifasDocmunent } from './schema/tarifas.schema';
import { Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { TarifaSeeder } from 'src/seeders/tarifas.seeder';

@Injectable()
export class TarifasService {
  constructor(@InjectModel(Tarifas.name) private readonly tarifaModel:Model<TarifasDocmunent>){}
  async create(createTarifaDto: CreateTarifaDto) {
    return await this.tarifaModel.create(createTarifaDto);
  }

  async findAll() {
    return await this.tarifaModel.find();
  }

  async findOne(id: string) {
    return await this.tarifaModel.findOne({id});
  }

  update(id: number, updateTarifaDto: UpdateTarifaDto) {
    return `This action updates a #${id} tarifa`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarifa`;
  }

  async findName (tipo:string){
    return await this.tarifaModel.findOne({ tipo: new RegExp(tipo, 'i') })

  }
  
  async defaulTarifas() {
    if(await IsEmptyDB(await this.tarifaModel))return await TarifaSeeder(this.tarifaModel)
  }
}
