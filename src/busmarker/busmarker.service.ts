import { Injectable } from '@nestjs/common';
import { CreateBusmarkerDto } from './dto/create-busmarker.dto';
import { UpdateBusmarkerDto } from './dto/update-busmarker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BusMarker, BusMarkerDocument } from './schema/busmarker.schema';
import { Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { BusMarkerSeeder } from 'src/seeders/busmarker.seeder';

@Injectable()
export class BusmarkerService {
  constructor(@InjectModel(BusMarker.name) private readonly busMakerModel:Model<BusMarkerDocument>){}
  async create(createBusmarkerDto: CreateBusmarkerDto) {
    return await this.busMakerModel.create(createBusmarkerDto);
  }

  async findAll() {
    return await this.busMakerModel.find();
  }

  async findOne(id: string) {
    return await this.busMakerModel.findOne({id});
  }

  update(id: number, updateBusmarkerDto: UpdateBusmarkerDto) {
    return `This action updates a #${id} busmarker`;
  }

  remove(id: number) {
    return `This action removes a #${id} busmarker`;
  }
  async findName (name:string){
    return await this.busMakerModel.findOne({ name: new RegExp(name, 'i') })

  }

  async defaultBusMaker() {
    if(await IsEmptyDB(await this.busMakerModel))return await BusMarkerSeeder(this.busMakerModel)
  }
}
