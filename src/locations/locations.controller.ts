import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('locations')
@ApiTags('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }
}
