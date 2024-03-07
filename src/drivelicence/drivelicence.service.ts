import { Injectable } from '@nestjs/common';
import { CreateDrivelicenceDto } from './dto/create-drivelicence.dto';
import { UpdateDrivelicenceDto } from './dto/update-drivelicence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DriveLicenceDocument, drivelicence } from './schema/driverlicence.schema';
import { Model } from 'mongoose';

@Injectable()
export class DrivelicenceService {
  constructor(@InjectModel(drivelicence.name) private readonly drivelicenceModel:Model<DriveLicenceDocument>  ){}
  async create(createDrivelicenceDto: CreateDrivelicenceDto) {
    return await this.drivelicenceModel.create(createDrivelicenceDto);
  }

  async findAll() {
    return await this.drivelicenceModel.find();
  }

  async findOne(id: string) {
    return await this.drivelicenceModel.findById(id);
  }

  async update(id: string, updateDrivelicenceDto: UpdateDrivelicenceDto) {
    return await this.drivelicenceModel.findByIdAndUpdate(id,updateDrivelicenceDto);
  }

  async remove(id: string) {
    return await this.drivelicenceModel.findByIdAndUpdate(id,{status:false});
  }
}
