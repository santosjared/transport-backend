import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gender, genderDocument } from './schema/gender.schema';
import { Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { GenderSeeder } from 'src/seeders/gender.seeder';

@Injectable()
export class GenderService {
  constructor(@InjectModel(Gender.name) private readonly genderModel:Model<genderDocument>
) {}
  async create(createGenderDto: CreateGenderDto) {
    return await this.genderModel.create(createGenderDto);
  }

  async findAll() {
    return await this.genderModel.find()
  }

  findOne(id: string ) {
    return `This action returns a #${id} gender`;
  }

  update(id: number, updateGenderDto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  remove(id: number) {
    return `This action removes a #${id} gender`;
  }
  async findName(name:string){
    return await this.genderModel.findOne({ name: new RegExp(name, 'i') })
  }

  async defaultGender() {
    if(await IsEmptyDB(this.genderModel))return await GenderSeeder(this.genderModel)
      return
  }
}
