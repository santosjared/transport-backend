import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rol, RolDocument } from './schema/roles.schema';
import { FilterQuery, Model, model } from 'mongoose';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { RolSeeder } from 'src/seeders/rol.seeder';
import { Role } from './entities/role.entity';
import { ComponentSDocument, Components } from 'src/componentes/schema/componentes';
import { Permission, PermissionDocument } from 'src/permission/schema/permission.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Rol.name) private readonly rolModel: Model<RolDocument>,
    @InjectModel(Components.name) private readonly componentsModel: Model<ComponentSDocument>,
    @InjectModel(Permission.name) private readonly permissionModel: Model<PermissionDocument>,
  ) { }
  async create(createRoleDto: CreateRoleDto) {
    if(!createRoleDto.name){
      throw new HttpException({message:{name:'El Campo nombre del rol es requerido'}}, HttpStatus.BAD_REQUEST);
    }
    const name = await this.rolModel.findOne({name:createRoleDto.name})
    if(name){
      throw new HttpException({message:{name:'El nombre de rol ya se ecuentra registrado'}}, HttpStatus.BAD_REQUEST);
    }
    return await this.rolModel.create(createRoleDto)
  }
  async findAll(filters: string): Promise<Role[]> {
    const regexPattern = new RegExp(filters, 'i');
    return await this.rolModel.find({ name: { $regex: regexPattern }, delete:false }).populate('Users').populate('access').exec()

  }

  async findOne(id: string) {
    return await this.rolModel.findOne({ id, delete: false })
    .populate('access')
    .exec();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try{
    const rol = await this.rolModel.findOne({name:updateRoleDto.name, id: { $ne: id }})
    if(!updateRoleDto.name){
      throw new HttpException({message:{name:'El Campo nombre del rol es requerido'}}, HttpStatus.BAD_REQUEST);
    }
    if(rol){
      throw new HttpException({message:{name:'El nombre de rol ya se ecuentra registrado'}}, HttpStatus.BAD_REQUEST);
    }
    return await this.rolModel.findOneAndUpdate({ id }, updateRoleDto);
  }catch(error){
    console.log(error)
  }
  }
  async remove(id: string) {
    try{
      return await this.rolModel.findOneAndUpdate ({id},{delete:true});
    }catch(error){
      console.log(error)
    }
    
  }
  async findRoleByName(roleName: string) {
    return this.rolModel.findOne({ name: roleName }).populate({
      path: 'components',
      populate: {
        path: 'permission',
        model: 'Permission'
      }
    }).exec();
  }

  async getPermissionsByRole(roleName: string) {
    const role = await this.findRoleByName(roleName);
    if (role && role.access) {
      return [role.access];
    }
    return [];
  }
  async Seeders() {
    if (await IsEmptyDB(this.rolModel)) return RolSeeder(this.rolModel)
  }
}
