import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UploadedFiles, Put, Query, UseGuards } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor} from '@nestjs/platform-express';
import { AsigneDriverDto } from './dto/asigne-driver.dto';
import { FiltersDto } from 'src/utils/filters.dto';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/permission.guard';
import { Permissions } from 'src/auth/decorator/permission.decorator';

@ApiBearerAuth()
@Controller('bus')
@ApiTags('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  @Permissions('Crear-microbus')
  @UseGuards(AuthGuard,RolesGuard)
  @UseInterceptors(FileFieldsInterceptor([{name:'photo'},{name:'ruat'}]))
  async create(@UploadedFiles() files:{photo?: Express.Multer.File[], ruat: Express.Multer.File[]}, @Body() createBusDto: CreateBusDto) {
    return await this.busService.create(createBusDto,files);
  }

  @Get()
  @Permissions('Listar-microbus')
  @UseGuards(AuthGuard,RolesGuard)
  async findAll(@Query() filters:any) {
    return await this.busService.findAll(filters);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  async findUsers(){
    return await this.busService.getUsers()
  }

  @Get(':id')
  @Permissions('Listar-microbus')
  @UseGuards(AuthGuard,RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.busService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('busroad/:id')
  async busroad(@Param('id') id:string){
    return this.busService.busroad(id)
  }

  @Put(':id')
  @Permissions('Editar-microbus')
  @UseGuards(AuthGuard,RolesGuard)
  @UseInterceptors(FileFieldsInterceptor([{name:'photo'},{name:'ruat'}]))
  async update(@Param('id') id: string, @UploadedFiles() files:{photo?: Express.Multer.File[], ruat: Express.Multer.File[]}, @Body() updateBusDto: UpdateBusDto) {
    return await this.busService.update(id, updateBusDto, files);
  }
  @UseGuards(AuthGuard)
  @Put('user/:id')
  async asigneUser (@Param('id') id:string, @Body() asigneDriverDto:AsigneDriverDto){
    return await this.busService.asigneDriver(id,asigneDriverDto)
  }

  @UseGuards(AuthGuard)
  @Put('designed/:id')
  async designed (@Param('id') id:string){
    return await this.busService.desasigned(id)
  }
  
  @Delete(':id')
  @Permissions('Eliminar-microbus')
  @UseGuards(AuthGuard,RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.busService.remove(id);
  }

}
