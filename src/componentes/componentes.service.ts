import { Injectable } from '@nestjs/common';
import { CreateComponenteDto } from './dto/create-componente.dto';
import { UpdateComponenteDto } from './dto/update-componente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ComponentSDocument, Components } from './schema/componentes';
import { Model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { ComponentsSeeder, permissionSeeder } from 'src/seeders/rol.seeder';
import { Permission, PermissionDocument } from 'src/permission/schema/permission.schema';

@Injectable()
export class ComponentesService {
  constructor(@InjectModel(Components.name) private readonly componentsModel:Model<ComponentSDocument>,
  @InjectModel(Permission.name) private readonly PermissionModel:Model<PermissionDocument>
){}
  async create(createComponenteDto: CreateComponenteDto) {
    return await 'createt'
  }

  async Seeders(){
    if(await IsEmptyDB(this.componentsModel))return ComponentsSeeder(this.componentsModel)
  }
async asignedPermission (){
  if(await IsEmptyDB(this.PermissionModel))return permissionSeeder(this.PermissionModel)
  const permisosDB = await this.PermissionModel.find()
 const  permisos = permisosDB.map((permiso)=>{
  return permiso._id
  })
  console.log(permisos)
}
  async findAll() {
    return await this.componentsModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} componente`;
  }

  update(id: number, updateComponenteDto: UpdateComponenteDto) {
    return `This action updates a #${id} componente`;
  }

  remove(id: number) {
    return `This action removes a #${id} componente`;
  }
}
