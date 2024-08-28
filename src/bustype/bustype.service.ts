import { Injectable } from '@nestjs/common';
import { CreateBustypeDto } from './dto/create-bustype.dto';
import { UpdateBustypeDto } from './dto/update-bustype.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BusType, BusTypeDocument } from './schema/bustype.schema';
import { Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { BusTypeSeeder } from 'src/seeders/typebus';

@Injectable()
export class BustypeService {
  constructor(@InjectModel(BusType.name) private readonly busTypeModel:Model<BusTypeDocument> ){}
  async create(createBustypeDto: CreateBustypeDto) {
    return await this.busTypeModel.create(createBustypeDto);
  }

  async findAll() {
    return await this.busTypeModel.find();
  }

  async findOne(id: string) {
    return await this.busTypeModel.findOne({id});
  }

  update(id: number, updateBustypeDto: UpdateBustypeDto) {
    return `This action updates a #${id} bustype`;
  }

  remove(id: number) {
    return `This action removes a #${id} bustype`;
  }

  async findName (name:string){
    return await this.busTypeModel.findOne({ name: new RegExp(name, 'i') })

  }

  async defaultBusType() {
    if(await IsEmptyDB(await this.busTypeModel))return await BusTypeSeeder(this.busTypeModel)
  }
}
