import { Injectable } from '@nestjs/common';
import { CreateRoadDto } from './dto/create-road.dto';
import { UpdateRoadDto } from './dto/update-road.dto';
import { Road } from './entities/road.entity';
import { Model } from 'mongoose';
import { RoadDocument } from './schema/road.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoadService {
  constructor(@InjectModel(Road.name) private readonly roadModel:Model<RoadDocument>){}
  async create(createRoadDto: CreateRoadDto) {
    return await this.roadModel.create(createRoadDto);
  }

  async findAll() {
    return await this.roadModel.find();
  }

  async findOne(id: string) {
    return await this.roadModel.findOne({id:id}) ;
  }

  async update(id: string, updateRoadDto: UpdateRoadDto) {
    return await this.roadModel.findByIdAndUpdate(id,updateRoadDto);
  }

  async remove(id: string) {
    return await this.roadModel.findOneAndUpdate({id:id },{status:false})
  }
}
