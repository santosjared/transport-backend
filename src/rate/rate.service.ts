import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rate, RateDocument } from './schema/rate.schema';
import { Model } from 'mongoose';
import { FiltersDto } from 'src/utils/filters.dto';

@Injectable()
export class RateService {
  constructor(@InjectModel(Rate.name) private readonly tarifaModel:Model<RateDocument>){}
  async create(createRateDto: CreateRateDto) {
    const errorMessages= await this.isValidData(createRateDto)
    if(!errorMessages){
      return await this.tarifaModel.create(createRateDto);
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async findAll(filters: any) {
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
        const result = await this.tarifaModel.find(searchFilters).skip(skip).limit(limit).exec();
        const total = await this.tarifaModel.countDocuments(searchFilters);
        return { result, total };
      }
    
      const result = await this.tarifaModel.find(searchFilters);
      const total = await this.tarifaModel.countDocuments(searchFilters);
      return { result, total };
    }
        
     const result = await this.tarifaModel.find({delete:false})
      const total = await this.tarifaModel.countDocuments({delete:false})
      return { result, total }
  }

  async findOne(id:string) {
    return await this.tarifaModel.findOne({id, delete:false});
  }

  async update(id: string, updateRateDto: UpdateRateDto) {
    const errorMessages= await this.isValidData(updateRateDto, true,id)
    if(!errorMessages){
      return await this.tarifaModel.findOneAndUpdate({id},updateRateDto);
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const delet = await this.tarifaModel.findOneAndUpdate({id},{delete:true},{new:true})
    if(delet){
      return delet
    }else{
      throw new NotFoundException('tarifa no encontrado');
    }
  }
  async isValidData(createRateDto: CreateRateDto | UpdateRateDto, update?:boolean, id?:string){
    const message={
      name:'',
      tipo:'',
      tarifa:''
    }
    let isError = false
    if(!createRateDto.name){
      isError=true
      message.name='el campo Nombre de Tarifa es requerido'
    }
    if(createRateDto.rates.length===0){
      isError = true
      message.tipo =  'el campo Tarifa es requerido'
    }
    if(createRateDto.name && !update){
      const rate = await this.tarifaModel.findOne({name:createRateDto.name})
      if(rate){
        isError = true
        message.name = 'El nombre de tarifa ya se encuentra registrado'
      }
    }
    if(createRateDto.name && update){
      const rate = await this.tarifaModel.findOne({name:createRateDto.name, id: { $ne: id }})
      if(rate){
        isError = true
        message.name = 'El nombre de tarifa ya se encuentra registrado'
      }
    }
    createRateDto.rates.map((values:{tipo:string,tarifa:string})=>{
      if(values.tarifa && values.tipo){
        if(!values.tipo){
          isError = true
          message.tipo = 'el campo Tipo tarifa es requerido'
        }
        if(!values.tarifa){
          isError = true
          message.tarifa = 'el campo Tarifa es requerido'
        }
        if(values.tarifa.length>10){
          isError = true
          message.tarifa = 'al campo Tarifa debe ingresar máximo 10 caracteres'
        }
        const mony = parseFloat(values.tarifa.charAt(values.tarifa.length-1))
        if(isNaN(mony)){
          isError = true
          message.tarifa = 'el campo Tarifa debe tener precio en números'
        }
      }else{
        isError = true
        message.tipo =  'el campo Tarifa es requerido'
      }
    })
    if(isError){
      return message
    }
    return null
  }
}
