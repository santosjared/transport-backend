import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { RoadService } from './road.service';
import { CreateRoadDto } from './dto/create-road.dto';
import { UpdateRoadDto } from './dto/update-road.dto';
import { ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';

@Controller('road')
@ApiTags('road')
export class RoadController {
  constructor(private readonly roadService: RoadService) {}

  @Post()
  async create(@Body() createRoadDto: CreateRoadDto) {
    return this.roadService.create(createRoadDto);
  }

  @Get()
  async findAll(@Query() filters:FiltersDto) {
    return this.roadService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roadService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoadDto: UpdateRoadDto) {
    return this.roadService.update(id, updateRoadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roadService.remove(id);
  }
}
