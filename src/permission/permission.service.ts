import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './schema/permission.schema';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private readonly permissionModel:Model<PermissionDocument>){}
 async findAll(){
  return await this.permissionModel.find()
 }
}
