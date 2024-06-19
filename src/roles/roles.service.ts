import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rol, RolDocument } from './schema/roles.schema';
import { FilterQuery, Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { RolSeeder } from 'src/seeders/rol.seeder';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Rol.name)private readonly rolModel:Model<RolDocument>){}
  async create(createRoleDto: CreateRoleDto) {
    return await this.rolModel.create(createRoleDto);
  }

  async findAll(filters:string):Promise<Role[]> {
    const regexPattern = new RegExp(filters, 'i'); 
    return this.rolModel.find({name:{$regex:regexPattern}}).exec()
    
  }

  async findOne(id: string) {
    return await this.rolModel.findOne({id, delete:false}).exec();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.rolModel.findOneAndUpdate({id},updateRoleDto);
  }
  remove(id: number) {
    return `This action removes a #${id} role`;
  }
  async Seeders(){
    if(await IsEmptyDB(this.rolModel))return RolSeeder(this.rolModel)
  }
}
