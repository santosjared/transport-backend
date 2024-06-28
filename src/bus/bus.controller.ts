import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UploadedFiles, Put, Query, UseGuards } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor} from '@nestjs/platform-express';
import { AsigneDriverDto } from './dto/asigne-driver.dto';
import { FiltersDto } from 'src/utils/filters.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiBearerAuth()
@Controller('bus')
@ApiTags('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{name:'photo'},{name:'ruat'}]))
  async create(@UploadedFiles() files:{photo?: Express.Multer.File[], ruat: Express.Multer.File[]}, @Body() createBusDto: CreateBusDto) {
    return await this.busService.create(createBusDto,files);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() filters:any) {
    return await this.busService.findAll(filters);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('users')
  async findUsers(){
    return await this.busService.getUsers()
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.busService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{name:'photo'},{name:'ruat'}]))
  async update(@Param('id') id: string, @UploadedFiles() files:{photo?: Express.Multer.File[], ruat: Express.Multer.File[]}, @Body() updateBusDto: UpdateBusDto) {
    return await this.busService.update(id, updateBusDto, files);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.busService.remove(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('user/:id')
  async asigneUser (@Param('id') id:string, @Body() asigneDriverDto:AsigneDriverDto){
    return await this.busService.asigneDriver(id,asigneDriverDto)
  }

  // @UseGuards(JwtAuthGuard)
  @Put('designed/:id')
  async designed (@Param('id') id:string){
    return await this.busService.desasigned(id)
  }
}
