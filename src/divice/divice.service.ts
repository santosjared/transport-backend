import { Injectable } from '@nestjs/common';
import { CreateDiviceDto } from './dto/create-divice.dto';
import { UpdateDiviceDto } from './dto/update-divice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Divice, DiviceDocument } from './schema/divice.schema';
import { Model} from 'mongoose';

@Injectable()
export class DiviceService {
  constructor(@InjectModel(Divice.name)private readonly diviceModel: Model<DiviceDocument>){}
  
  async create(createDiviceDto: CreateDiviceDto) {
    const data = {
      name:createDiviceDto.name,
      brand:createDiviceDto.brand,
      model:createDiviceDto.model,
      connect:true
    }
    return await this.diviceModel.create(data)
  }

  async findAll() {
    return await this.diviceModel.find();
  }

  async findOne(id: string) {
    try{
      return await this.diviceModel.findOne({id});
    }catch(e){
      console.log(e)
      return null
    }
  }

  async updateStatus(id: string,statusConnect:boolean){

    return await this.diviceModel.findOneAndUpdate({id:id},{connect:statusConnect})
  }
  update(id: string, updateDiviceDto: UpdateDiviceDto) {
    return this.diviceModel.findOneAndUpdate({id},updateDiviceDto);
  }

  remove(id: string) {
    return `This action removes a #${id} divice`;
  }

}
