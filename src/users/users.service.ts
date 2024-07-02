import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UsersMessageError } from 'src/utils/messages/useres-message.error';
import { FiltersDto } from 'src/utils/filters.dto';
import { Bus, BusDocmunet } from 'src/bus/schema/bus.schema';
import { last } from 'rxjs';
import { ComponentsSeeder} from 'src/seeders/rol.seeder';
import { Rol, RolDocument } from 'src/roles/schema/roles.schema';
import { ComponentSDocument, Components } from 'src/componentes/schema/componentes';
import { Permission, PermissionDocument } from 'src/permission/schema/permission.schema';
import { IsEmptyDB } from 'src/utils/isEmptyDB';
import { Auth, AuthDocument } from 'src/auth/schema/auth.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    private authService: AuthService,
  @InjectModel(Rol.name) private readonly rolModel: Model<RolDocument>,
  @InjectModel(Components.name) private readonly ComponentsModel: Model<ComponentSDocument>,
  @InjectModel(Permission.name) private readonly permissionModel:Model<PermissionDocument>,
  @InjectModel(Bus.name) private readonly busModel:Model<BusDocmunet>,
  @InjectModel(Auth.name) private readonly authModel:Model<AuthDocument>,
  ) { }
  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    const { email, password, ci } = createUserDto
    const dbEmail = await this.userModel.findOne({ email })
    if (dbEmail) {
      if (dbEmail.delete) {
        createUserDto.delete=false
        this.authService.update(email,{email,delete:false})
        return this.update(dbEmail.id, createUserDto,file)
      }
      UsersMessageError.email = 'el Correo Electrónico ya se encuentra registrado'
      throw new HttpException(UsersMessageError, HttpStatus.BAD_REQUEST);
    }
    const dbCi = await this.userModel.findOne({ ci })
    if (dbCi) {
      if (dbCi.delete) {
        createUserDto.delete=false
        this.authService.update(email,{email,delete:false})
        return this.update(dbEmail.id, createUserDto, file)
      }
      UsersMessageError.ci = 'El Ci ya se encuentra registrado'
      throw new HttpException(UsersMessageError, HttpStatus.BAD_REQUEST);
    }
    if (file) {
      const fs = require('fs');
      fs.renameSync(file.path, `./uploads/${file.originalname}`)
      createUserDto.profile = `/uploads/${file.originalname}`;
      const auth = await this.authService.findOne(email)
      if (auth) {
        return await this.userModel.create(createUserDto);
      }
      this.authService.create({ email, password })
      return await this.userModel.create(createUserDto);
    }
    this.authService.create({ email, password })
    return await this.userModel.create(createUserDto);

  }
  async findAll(filters: any) {
    if(filters){
      const {filter,skip,limit}=filters
      const searchFilters = {delete:false}
      if (filter) {
        if (filter.name) {
          searchFilters['name'] = { $regex: new RegExp(filter.name, 'i') };
        }
        if (filter.ci) {
          searchFilters['ci'] = { $regex: new RegExp(filter.ci, 'i') };
        }
        if(filter.address) {
          searchFilters['address'] = { $regex: new RegExp(filter.address, 'i') };
        }
        if(filter.phone) {
          searchFilters[''] = { $regex: new RegExp(filter.address, 'i') };
        }
        if(filter.gender) {
          searchFilters['gender'] = { $regex: new RegExp(filter.gender, 'i') };
        }
        if (filter.contry) {
          searchFilters['contry'] = { $regex: new RegExp(filter.contry, 'i') };
        }
      }
      if (skip !== undefined && limit !== undefined) {
        const result = await this.userModel.find(searchFilters).populate('rol').populate('licenceId').skip(skip).limit(limit).exec();
        const total = await this.userModel.countDocuments(searchFilters)
        return { result, total }
      }else{
        const result = await this.userModel.find(searchFilters).populate('rol').populate('licenceId')
        const total = await this.userModel.countDocuments(searchFilters)
        return { result, total }
      }
    }else{
      const result = await this.userModel.find({delete:false}).populate('rol').populate('licenceId')
        const total = await this.userModel.countDocuments({delete:false})
        return { result, total }
    }
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ id, delete: false });
  }
  async findUser(filters){
    const { filter, skip, limit } = filters
    const regexPattern = new RegExp(filter, 'i');
    const columnsToSearch = ['name', 'lastName', 'gender', 'ci', 'phone', 'address', 'contry', 'email', 'profile'];

    const orConditions = columnsToSearch.map(column => ({
      [column]: { $regex: regexPattern }
    }));

    if (skip && limit) {
      const result = await this.userModel.find({$or:orConditions,delete:false,busId:null}).skip(skip).limit(limit).exec();
      const total = await this.userModel.countDocuments({$or:orConditions,delete:false})
      return { result, total }
    }
    const result = await this.userModel.find({$or:orConditions,delete:false,busId:null}).exec();
    const total = await this.userModel.countDocuments({$or:orConditions,delete:false,busId:null})
    return { result, total }
  }
  async update(id: string, updateUserDto: UpdateUserDto, file: Express.Multer.File) {
    const { email } = updateUserDto
    if (file) {
      const fs = require('fs');
      fs.renameSync(file.path, `./uploads/${file.originalname}`)
      updateUserDto.profile = `/uploads/${file.originalname}`;
      this.authService.update(email,{ email})
      return await this.userModel.findOneAndUpdate({id},updateUserDto);
    }
    this.authService.update(email,{ email})
    return await this.userModel.findOneAndUpdate({id},updateUserDto);
    
  }
  async updateStatus(id: string, status: string) {
    console.log(id)
    return await this.userModel.findOneAndUpdate({ _id:id }, { status, lastConnect: new Date(Date.now()) });
  }
  async remove(id: string) {
    const remove = await this.userModel.findOneAndUpdate({ id }, { delete: true }, { new: true });
    this.authService.remove(remove.email)
    return remove
  }
  async Users(filters){
    const usersAssignedToBus = await this.busModel.find().distinct('userId').exec();
    if (usersAssignedToBus === null) {
      return [];
    }
    const userIdsAssignedToBus = usersAssignedToBus
      .filter(userId => userId !== null)
      .map(userId => userId.toString()); 
      const { filter, skip, limit } = filters
      const regexPattern = new RegExp(filter, 'i');
      const columnsToSearch = ['name', 'lastName', 'gender', 'ci', 'phone', 'address', 'contry', 'email', 'profile'];
  
      const orConditions = columnsToSearch.map(column => ({
        [column]: { $regex: regexPattern }
      }));
      if (skip && limit) {
        const result = await this.userModel.find({ 
          $and: [
              { _id: { $nin: userIdsAssignedToBus } },
              { $or: orConditions },
              { delete: false }
          ]
      }).skip(skip).limit(limit).exec();
        const total = await this.userModel.countDocuments({ 
          $and: [
              { _id: { $nin: userIdsAssignedToBus } },
              { $or: orConditions },
              { delete: false }
          ]
      })
        return { result, total }
      }
      const result = await this.userModel.find({ 
        $and: [
            { _id: { $nin: userIdsAssignedToBus } },
            { $or: orConditions },
            { delete: false }
        ]
    }).exec();
      const total = await this.userModel.countDocuments({ 
        $and: [
            { _id: { $nin: userIdsAssignedToBus } },
            { $or: orConditions },
            { delete: false }
        ]
    })
      return { result, total }
  }

  async DefaultCreateUser(){
    if(await IsEmptyDB(this.ComponentsModel)) {await ComponentsSeeder(this.ComponentsModel)}
    const defaultUser = await this.userModel.findOne({email:'adminbus@gmail.com'})
    if(!defaultUser){
    const componentes = await this.ComponentsModel.find()
    const componetsId = componentes.map((componente)=>{
      return componente._id.toString();
    })
    const rolData = {
      name:'Administrador',
      access:componetsId
    }
    const rol = await this.rolModel.create(rolData)
    const userData = {
      name:'super',
      lastName:'admin',
      gender:'Ninguno',
      ci:'Ninguno',
      phone:'Ninguno',
      address:'Ninguno',
      contry:'Niguno',
      email:'adminbus@gmail.com',
      profile:'',
      password:'adminbus',
      rol:rol._id.toString()
    }
    const user = await this.create(userData)
    const upateRol = await this.rolModel.findOneAndUpdate({name:'Administrador'},{Users:[user._id.toString()]})
    }
  }
  async usersNotRol(){
    return await this.userModel.find({rol:null})
  }
   async asignedRol(id:string,idrol:{idrol:string}){
     const role = await this.rolModel.findByIdAndUpdate(idrol.idrol,{ $addToSet: { Users: { $each:[id.toString()] } } })
    return await this.userModel.findByIdAndUpdate(id,{rol:idrol.idrol})
   }
   async desasignedrol(id:string, idrol:{idrol:string}){
    const user = await this.userModel.findOneAndUpdate({id},{rol:null})
    const update = await this.rolModel.findOneAndUpdate({ id:idrol.idrol }, { $pull: { Users: { $in:[user._id] } } }, { new: true })
    return update
   }
 }

