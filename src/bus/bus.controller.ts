import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Bind, Put } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('bus')
@ApiTags('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@UploadedFile() file:Express.Multer.File, @Body() createBusDto: CreateBusDto) {
    return await this.busService.create(createBusDto,file);
  }

  @Get()
  async findAll() {
    return await this.busService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.busService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return await this.busService.update(id, updateBusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.busService.remove(id);
  }
  @Put('user/:id')
  async updateIduser (@Body() data:{id:string,userId:string}){
    const {id,userId}=data
    return await this.busService.updateUserId(id,userId)
  }
}
