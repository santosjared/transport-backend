import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LineaService } from './linea.service';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('linea')
@ApiTags('linea')
export class LineaController {
  constructor(private readonly lineaService: LineaService) {}

  @Post()
  create(@Body() createLineaDto: CreateLineaDto) {
    return this.lineaService.create(createLineaDto);
  }

  @Get()
  findAll() {
    return this.lineaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lineaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLineaDto: UpdateLineaDto) {
    return this.lineaService.update(+id, updateLineaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lineaService.remove(+id);
  }
}
