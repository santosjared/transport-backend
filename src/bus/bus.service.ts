import { Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from './entities/bus.entity';
import { Model } from 'mongoose';
import { BusDocmunet } from './schema/bus.schema';

@Injectable()
export class BusService {
  constructor(@InjectModel(Bus.name) private readonly busModel:Model<BusDocmunet>){}
  async create(createBusDto: CreateBusDto, file:Express.Multer.File) {
    const fs = require('fs');
    fs.renameSync(file.path, `./uploads/${file.originalname}`);
    createBusDto.photo = `/uploads/${file.originalname}`;
    return await this.busModel.create(createBusDto)
  }

  async findAll() {
    return await this.busModel.find()
  }

  async findOne(id: string) {
    return await this.busModel.findById(id)
  }

  async update(id: string, updateBusDto: UpdateBusDto) {
    return await this.busModel.findByIdAndUpdate(id,updateBusDto)
  }

  async remove(id: string) {
    return this.busModel.findByIdAndUpdate(id,{status:false})
  }
}
