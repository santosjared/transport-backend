import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoadDto } from './dto/create-road.dto';
import { UpdateRoadDto } from './dto/update-road.dto';
import { Road } from './entities/road.entity';
import { Model } from 'mongoose';
import { RoadDocument } from './schema/road.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FiltersDto } from 'src/utils/filters.dto';

@Injectable()
export class RoadService {
  constructor(@InjectModel(Road.name) private readonly roadModel:Model<RoadDocument>){}
  async create(createRoadDto: CreateRoadDto) {
    const errorMessages= await this.isValidData(createRoadDto)
    if(!errorMessages){
      return await this.roadModel.create(createRoadDto);
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async findAll(filters: FiltersDto) {
    const { filter, skip, limit } = filters
    const regexPattern = new RegExp(filter, 'i');
    const columnsToSearch = ['name', 'rates'];

    const orConditions = columnsToSearch.map(column => ({
      [column]: { $regex: regexPattern }
    }));

    if (skip && limit) {
      const result = await this.roadModel.find({$or:orConditions,delete:false}).skip(skip).limit(limit).exec();
      const total = await this.roadModel.countDocuments({$or:orConditions,delete:false})
      return { result, total }
    }
    const result = await this.roadModel.find({$or:orConditions,delete:false}).exec();
    const total = await this.roadModel.countDocuments({$or:orConditions,delete:false})
    return { result, total }
  }

  async findOne(id: string) {
    return await this.roadModel.findOne({id:id}) ;
  }

  async update(id: string, updateRoadDto: UpdateRoadDto) {
    const errorMessages= await this.isValidData(updateRoadDto)
    if(!errorMessages){
      return await this.roadModel.findOneAndUpdate({id},updateRoadDto);
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const delet = await this.roadModel.findOneAndUpdate({id},{delete:true},{new:true})
    if(delet){
      return delet
    }else{
      throw new NotFoundException('tarifa no encontrado');
    }
  }
  async isValidData(createRoadDto: CreateRoadDto | UpdateRoadDto, update?:boolean){
    const message={
      name:''
    }
    let isError = false
    if(!createRoadDto.name){
      isError = true
      message.name='el campo nombre de la ruta es requerido'
    }
    if(isError){
      return message
    }
    return null
  }
}
