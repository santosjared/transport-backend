import { Injectable } from '@nestjs/common';
import { CreateDiviceDto } from './dto/create-divice.dto';
import { UpdateDiviceDto } from './dto/update-divice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Divice, DiviceDocument } from './schema/divice.schema';
import { Model} from 'mongoose';
import { hasCompare, hashCrypto } from 'src/utils/crypto';

@Injectable()
export class DiviceService {
  constructor(@InjectModel(Divice.name)private readonly diviceModel: Model<DiviceDocument>){}
  
  async create(createDiviceDto: CreateDiviceDto) {
    const {key}=createDiviceDto
    createDiviceDto.key= await hashCrypto(key)
    return await this.diviceModel.create(createDiviceDto)
  }

  async findAll() {
    return await this.diviceModel.find();
  }

  async findOne(id: string) {
    try{
      return await this.diviceModel.findOne({id:id});
    }catch(e){
      console.log(e)
      return null
    }
  }

  async updateStatus(id: string,statusConnect:boolean){

    return await this.diviceModel.findOneAndUpdate({id:id},{connect:statusConnect})
  }
  update(id: string | number, updateDiviceDto: UpdateDiviceDto) {
    return this.diviceModel.findOneAndUpdate({id:id},updateDiviceDto);
  }

  remove(id: string | number) {
    return this.diviceModel.findOneAndUpdate({id:id}, {status:false});
  }

 async verifyDiviceCredentials(data:{user:string,key:string}):Promise<boolean>{
    const {user,key}=data
    const findUser = await this.diviceModel.findOne({user:user})
    if(findUser){
      if(user==findUser.user&& await hasCompare(key,findUser.key))
        {        
          return true
        }
    }
      return false;
  }

  async findUser(data:string){
    return await this.diviceModel.findOne({user:data})
  }
  async updateUserId(id:string, userId:string){
    return this.diviceModel.findOneAndUpdate({id:id},{idUser:userId})
  }

}
