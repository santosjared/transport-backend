import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FiltersDto } from 'src/utils/filters.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('profile'))
  create(@UploadedFile() file:Express.Multer.File,@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto,file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('asignedUsers')
  async users(@Query() filters:FiltersDto){
    return await this.usersService.Users(filters)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() filters:any) {
    return await this.usersService.findAll(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findUnser(@Query() filters:FiltersDto){
    return await this.usersService.findUser(filters)
  }

  @UseGuards(JwtAuthGuard)
  @Get('notroles')
  async NotRol(){
    return await this.usersService.usersNotRol()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('profile'))
  update(@Param('id') id: string,@UploadedFile() file:Express.Multer.File, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Put('asignedrol/:id')
  async asignedRol(@Param('id') id: string, @Body() idrol: {idrol:string}) {
    return await this.usersService.asignedRol(id, idrol);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put('desasignedrol/:id')
  async desasignedrol(@Param('id') id: string , @Body() idrol: {idrol:string}){
    return this.usersService.desasignedrol(id, idrol)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
