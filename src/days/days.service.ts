import { Injectable } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Days, DaysDocument } from './schema/days.schema';
import { Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { DaysSeeder } from 'src/seeders/days.seeder';

@Injectable()
export class DaysService {
  constructor(@InjectModel(Days.name) private readonly daysModel:Model<DaysDocument>){}
  async create(createDayDto: CreateDayDto) {
    return await this.daysModel.create(createDayDto);
  }

  async findAll() {
    return await this.daysModel.find();
  }

  async findOne(id: string) {
    return await  this.daysModel.findOne({id});
  }

  update(id: number, updateDayDto: UpdateDayDto) {
    return `This action updates a #${id} day`;
  }

  remove(id: number) {
    return `This action removes a #${id} day`;
  }

  async findName (name:string){
    return await this.daysModel.findOne({ name: new RegExp(name, 'i') })

  }

  async defaultDays() {
    if(await IsEmptyDB(await this.daysModel))return await DaysSeeder(this.daysModel)
  }
}
