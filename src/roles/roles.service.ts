import { Injectable } from '@nestjs/common';
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
import { AccesRules, AccesRulesDocument } from './schema/accessrules';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Rol.name) private readonly rolModel: Model<RolDocument>,
    @InjectModel(Components.name) private readonly componentsModel: Model<ComponentSDocument>,
    @InjectModel(Permission.name) private readonly permissionModel: Model<PermissionDocument>,
    @InjectModel(AccesRules.name) private readonly accesRulesModel:Model<AccesRulesDocument>
  ) { }
  async create(createRoleDto: CreateRoleDto) {

    const acces= createRoleDto.access.map((value)=>{
      return {
        componente:value.accessId, permisos:value.permissionIds
      }
    })

     const newRole = await this.rolModel.create({ name: createRoleDto.name, access: acces });
    
    return newRole;
  }
  async findAll(filters: string): Promise<Role[]> {
    const regexPattern = new RegExp(filters, 'i');
    return await this.rolModel.find({ name: { $regex: regexPattern } }).populate('Users').populate('access').exec()

  }

  async findOne(id: string) {
    return await this.rolModel.findOne({ id, delete: false })
    .populate({
      path: 'access',
      populate: [
        { path: 'componente', model:'Components' },
        { path: 'permisos', model:'Permission' }
      ]
    })
    .exec();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.rolModel.findOneAndUpdate({ id }, updateRoleDto);
  }
  remove(id: number) {
    return `This action removes a #${id} role`;
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
