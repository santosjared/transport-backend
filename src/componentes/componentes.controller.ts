import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComponentesService } from './componentes.service';
import { CreateComponenteDto } from './dto/create-componente.dto';
import { UpdateComponenteDto } from './dto/update-componente.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('componentes')
@ApiTags('componentes')
export class ComponentesController {
  constructor(private readonly componentesService: ComponentesService) {}


  @Get()
  async findAll() {
    return await this.componentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentesService.findOne(+id);
  }
}
