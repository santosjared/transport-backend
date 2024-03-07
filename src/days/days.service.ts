import { Injectable } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Days, DaysDocument } from './schema/days.shema';
import { Model } from 'mongoose';
import { DaysSeeder } from 'src/seeders/days.seeder';
import { IsEmptyDB} from '../utils/isEmptyDB';

@Injectable()
export class DaysService {
  constructor(
    @InjectModel(Days.name) private readonly daysModel:Model<DaysDocument>
    ){}
  async create(createDayDto: CreateDayDto) {
    return await this.daysModel.create(createDayDto);
  }
  async findAll() {
    return await this.daysModel.find();
  }

  async findOne(id: string) {
    return await this.daysModel.findById(id);
  }

  async update(id: string, updateDayDto: UpdateDayDto) {
    return await this.daysModel.findByIdAndUpdate(id,updateDayDto);
  }

  async remove(id: string) {
    return await this.daysModel.findByIdAndDelete(id);
  }
  async Seeders(){
    if(await IsEmptyDB(this.daysModel))DaysSeeder(this.daysModel)
  }
}
