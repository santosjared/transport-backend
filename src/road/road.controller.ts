import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoadService } from './road.service';
import { CreateRoadDto } from './dto/create-road.dto';
import { UpdateRoadDto } from './dto/update-road.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('road')
@ApiTags('road')
export class RoadController {
  constructor(private readonly roadService: RoadService) {}

  @Post()
  async create(@Body() createRoadDto: CreateRoadDto) {
    return this.roadService.create(createRoadDto);
  }

  @Get()
  async findAll() {
    return this.roadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roadService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoadDto: UpdateRoadDto) {
    return this.roadService.update(id, updateRoadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roadService.remove(id);
  }
}
