import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusmarkerService } from './busmarker.service';
import { CreateBusmarkerDto } from './dto/create-busmarker.dto';
import { UpdateBusmarkerDto } from './dto/update-busmarker.dto';

@Controller('busmarker')
export class BusmarkerController {
  constructor(private readonly busmarkerService: BusmarkerService) {}

  @Get()
  findAll() {
    return this.busmarkerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busmarkerService.findOne(id);
  }
}
