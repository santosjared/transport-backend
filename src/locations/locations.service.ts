import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Locations, LocationsDocument } from './schema/locations.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LocationsService {
  constructor(@InjectModel(Locations.name) private readonly serviceModel:Model<LocationsDocument>){}
  
  async create(createLocationDto: CreateLocationDto) {
    return await this.serviceModel.create(createLocationDto)
  }

  async findAll() {
    return await this.serviceModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }
  async findUser(user:string){
    return await this.serviceModel.findOne({user:user})
  }
  async update(user: string, updateLocationDto: UpdateLocationDto) {
    return await this.serviceModel.findOneAndUpdate({user:user},updateLocationDto);
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
