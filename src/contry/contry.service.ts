import { Injectable } from '@nestjs/common';
import { CreateContryDto } from './dto/create-contry.dto';
import { UpdateContryDto } from './dto/update-contry.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contry, ContryDocument } from './schema/contry.schema';
import { Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { ContrySeeder } from 'src/seeders/contry.seeder';

@Injectable()
export class ContryService {
  constructor(@InjectModel(Contry.name)private readonly contryModel:Model<ContryDocument>){}
  async create(createContryDto: CreateContryDto) {
    return await this.contryModel.create(createContryDto);
  }

  async findAll() {
    return await this.contryModel.find();
  }

  async findOne(id: string) {
    return await this.contryModel.findById(id);
  }

  update(id: number, updateContryDto: UpdateContryDto) {
    return `This action updates a #${id} contry`;
  }

  remove(id: number) {
    return `This action removes a #${id} contry`;
  }

  async findName (name:string){
    return await this.contryModel.findOne({ name: new RegExp(name, 'i') })

  }

  async defaultContry() {
    if(await IsEmptyDB(await this.contryModel))return await ContrySeeder(this.contryModel)
  }
}
