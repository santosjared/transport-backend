import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BustypeService } from './bustype.service';
import { CreateBustypeDto } from './dto/create-bustype.dto';
import { UpdateBustypeDto } from './dto/update-bustype.dto';

@Controller('bustype')
export class BustypeController {
  constructor(private readonly bustypeService: BustypeService) {}
  @Get()
  findAll() {
    return this.bustypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bustypeService.findOne(id);
  }
}
