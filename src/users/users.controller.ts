import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FiltersDto } from 'src/utils/filters.dto';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/permission.guard';
import { Permissions } from 'src/auth/decorator/permission.decorator';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permissions('Crear-usuarios')
  @UseGuards(AuthGuard,RolesGuard)
  @UseInterceptors(FileInterceptor('profile'))
  async create(@UploadedFile() file:Express.Multer.File,@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto,file);
  }

  @UseGuards(AuthGuard)
  @Get('asignedUsers')
  async users(@Query() filters:FiltersDto){
    return await this.usersService.Users(filters)
  }


  @Get()
  @Permissions('Listar-usuarios')
  @UseGuards(AuthGuard,RolesGuard)
  async findAll(@Query() filters:any) {
    return await this.usersService.findAll(filters);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  async findUnser(@Query() filters:FiltersDto){
    return await this.usersService.findUser(filters)
  }

  @UseGuards(AuthGuard)
  @Get('notroles')
  async NotRol(@Query() filters:{name:string}){
    return await this.usersService.usersNotRol(filters)
  }

  @Get(':id')
  @Permissions('Listar-usuarios')
  @UseGuards(AuthGuard,RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @Permissions('Editar-usuarios')
  @UseGuards(AuthGuard,RolesGuard)
  @UseInterceptors(FileInterceptor('profile'))
  update(@Param('id') id: string,@UploadedFile() file:Express.Multer.File, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto, file);
  }

  @UseGuards(AuthGuard)
  @Put('asignedrol/:id')
  async asignedRol(@Param('id') id: string, @Body() idrol: {idrol:string}) {
    return await this.usersService.asignedRol(id, idrol);
  }
  
  @UseGuards(AuthGuard)
  @Put('desasignedrol/:id')
  async desasignedrol(@Param('id') id: string , @Body() idrol: {idrol:string}){
    return this.usersService.desasignedrol(id, idrol)
  }

  @Delete(':id')
  @Permissions('Eliminar-usuarios')
  @UseGuards(AuthGuard,RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
