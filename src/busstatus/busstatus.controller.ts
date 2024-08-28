import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusstatusService } from './busstatus.service';
import { CreateBusstatusDto } from './dto/create-busstatus.dto';
import { UpdateBusstatusDto } from './dto/update-busstatus.dto';

@Controller('busstatus')
export class BusstatusController {
  constructor(private readonly busstatusService: BusstatusService) {}

  @Get()
  findAll() {
    return this.busstatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busstatusService.findOne(id);
  }
}
