import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { permissionSeeder } from 'src/seeders/rol.seeder';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private readonly permissionModel:Model<PermissionDocument>){}
  async Seeders(){
    if(await IsEmptyDB(this.permissionModel))return permissionSeeder(this.permissionModel)
  }
 async findAll(){
  return await this.permissionModel.find()
 }
}
