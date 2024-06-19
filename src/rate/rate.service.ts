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

  async findAll(filters: FiltersDto) {
    const { filter, skip, limit } = filters
    const regexPattern = new RegExp(filter, 'i');
    const columnsToSearch = ['name', 'rates'];

    const orConditions = columnsToSearch.map(column => ({
      [column]: { $regex: regexPattern }
    }));

    if (skip && limit) {
      const result = await this.tarifaModel.find({$or:orConditions,delete:false}).skip(skip).limit(limit).exec();
      const total = await this.tarifaModel.countDocuments({$or:orConditions,delete:false})
      return { result, total }
    }
    const result = await this.tarifaModel.find({$or:orConditions,delete:false}).exec();
    const total = await this.tarifaModel.countDocuments({$or:orConditions,delete:false})
    return { result, total }

  }

  async findOne(id:string) {
    return await this.tarifaModel.findOne({id, delete:false});
  }

  async update(id: string, updateRateDto: UpdateRateDto) {
    const errorMessages= await this.isValidData(updateRateDto)
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
  async isValidData(createRateDto: CreateRateDto | UpdateRateDto, update?:boolean){
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
      message.tipo =  'el campo Tipo tarifa es requerido'
      message.tipo =  'el campo Tarifa es requerido'
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
        message.tipo =  'el campo Tipo tarifa es requerido'
        message.tipo =  'el campo Tarifa es requerido'
      }
    })
    if(isError){
      return message
    }
    return null
  }
}
