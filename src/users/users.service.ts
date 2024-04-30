import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly userModel:Model<UsersDocument>){}
  async create(createUserDto: CreateUserDto, file:Express.Multer.File) {
    const fs = require('fs');
    fs.renameSync(file.path, `./uploads/${file.originalname}`)
    createUserDto.profile = `/uploads/${file.originalname}`;
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: number | string) {
    return await this.userModel.findOne({id:id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
