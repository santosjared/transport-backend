import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiviceService } from './divice.service';
import { CreateDiviceDto } from './dto/create-divice.dto';
import { UpdateDiviceDto } from './dto/update-divice.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('divice')
@ApiTags('divices')
export class DiviceController {
  constructor(private readonly diviceService: DiviceService) {}

  @Post()
  create(@Body() createDiviceDto: CreateDiviceDto) {
    return this.diviceService.create(createDiviceDto);
  }

  @Get()
  findAll() {
    return this.diviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diviceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiviceDto: UpdateDiviceDto) {
    return this.diviceService.update(id, updateDiviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diviceService.remove(id);
  }
}
