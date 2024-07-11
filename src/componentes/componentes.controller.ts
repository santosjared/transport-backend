import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComponentesService } from './componentes.service';
import { CreateComponenteDto } from './dto/create-componente.dto';
import { UpdateComponenteDto } from './dto/update-componente.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiBearerAuth()
@Controller('componentes')
@ApiTags('componentes')
export class ComponentesController {
  constructor(private readonly componentesService: ComponentesService) {}


  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.componentesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentesService.findOne(+id);
  }
}
