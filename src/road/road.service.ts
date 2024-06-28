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
    throw new HttpException({message:errorMessages}, HttpStatus.BAD_REQUEST);
  }

  async findAll(filters: any) {
    {
      if (filters) {
        const { filter, skip, limit } = filters;
        const searchFilters = { delete: false };
      
        if (filter) {
          if (filter.name) {
            searchFilters['name'] = { $regex: new RegExp(filter.name, 'i') };
          }
      
          if (filter.createdAt) {
            const date = filter.createdAt;
            const startDate = new Date(`${date}T00:00:00.000Z`);
            const endDate = new Date(`${date}T23:59:59.999Z`);
            searchFilters['createdAt'] = {
              $gte: startDate,
              $lte: endDate
            };
          }
        }
      
        if (skip !== undefined && limit !== undefined) {
          const result = await this.roadModel.find(searchFilters).skip(skip).limit(limit).exec();
          const total = await this.roadModel.countDocuments(searchFilters);
          return { result, total };
        }
      
        const result = await this.roadModel.find(searchFilters);
        const total = await this.roadModel.countDocuments(searchFilters);
        return { result, total };
      }
          
       const result = await this.roadModel.find({delete:false})
        const total = await this.roadModel.countDocuments({delete:false})
        return { result, total }
  }
}

  async findOne(id: string) {
    return await this.roadModel.findOne({id:id}) ;
  }

  async update(id: string, updateRoadDto: UpdateRoadDto) {
    const errorMessages= await this.isValidData(updateRoadDto,true,id)
    if(!errorMessages){
      return await this.roadModel.findOneAndUpdate({id},updateRoadDto);
    }
    throw new HttpException({message:errorMessages}, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const delet = await this.roadModel.findOneAndUpdate({id},{delete:true},{new:true})
    if(delet){
      return delet
    }else{
      throw new NotFoundException('tarifa no encontrado');
    }
  }
  async isValidData(createRoadDto: CreateRoadDto | UpdateRoadDto, update?:boolean, id?:string){
    const message={
      name:''
    }
    let isError = false
    if (createRoadDto.name && !update) {
      const rate = await this.roadModel.findOne({ name: createRoadDto.name })
      if (rate) {
        isError = true
        message.name = 'El nombre de tarifa ya se encuentra registrado'
      }
    }
    if (createRoadDto.name && update) {
      const rate = await this.roadModel.findOne({ name: createRoadDto.name, id: { $ne: id } })
      if (rate) {
        isError = true
        message.name = 'El nombre de tarifa ya se encuentra registrado'
      }
    }
    if(isError){
      return message
    }
    return null
  }
}
