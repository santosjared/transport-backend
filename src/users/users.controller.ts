import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FiltersDto } from 'src/utils/filters.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profile'))
  create(@UploadedFile() file:Express.Multer.File,@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto,file);
  }

  @Get('asignedUsers')
  async users(@Query() filters:FiltersDto){
    return await this.usersService.Users(filters)
  }
  @Get()
  async findAll(@Query() filters:any) {
    return await this.usersService.findAll(filters);
  }
  @Get('users')
  async findUnser(@Query() filters:FiltersDto){
    return await this.usersService.findUser(filters)
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('profile'))
  update(@Param('id') id: string,@UploadedFile() file:Express.Multer.File, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
