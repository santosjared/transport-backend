import { Injectable } from '@nestjs/common';
import { CreateBusstatusDto } from './dto/create-busstatus.dto';
import { UpdateBusstatusDto } from './dto/update-busstatus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BusStatus, BusStatusDocument } from './schema/busstatus.schema';
import { Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { BusStatusSeeder } from 'src/seeders/busstatus.seeder';

@Injectable()
export class BusstatusService {
  constructor(@InjectModel(BusStatus.name) private readonly BusStatusModel: Model<BusStatusDocument>){}
  async create(createBusstatusDto: CreateBusstatusDto) {
    return await this.BusStatusModel.create(createBusstatusDto);
  }

  async findAll() {
    return await this.BusStatusModel.find();
  }

  async findOne(id: string) {
    return await this.BusStatusModel.findOne({id});
  }

  update(id: number, updateBusstatusDto: UpdateBusstatusDto) {
    return `This action updates a #${id} busstatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} busstatus`;
  }

  async findName (name:string){
    return await this.BusStatusModel.findOne({ name: new RegExp(name, 'i') })

  }

  async defaultBusStatus() {
    if(await IsEmptyDB(await this.BusStatusModel))return await BusStatusSeeder(this.BusStatusModel)
  }
}
