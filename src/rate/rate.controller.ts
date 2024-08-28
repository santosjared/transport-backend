import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/permission.guard';
import { Permissions } from 'src/auth/decorator/permission.decorator';

@Controller('tarifa')
@ApiTags('tarifa')
@ApiBearerAuth()
export class TarifaController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  @Permissions('Crear-tarifa')
  @UseGuards(AuthGuard,RolesGuard)
  create(@Body() createRatefaDto: CreateRateDto) {
    return this.rateService.create(createRatefaDto);
  }

  @Get()
  @Permissions('Listar-tarifa')
  @UseGuards(AuthGuard,RolesGuard)
  findAll(@Query() filters:FiltersDto) {
    return this.rateService.findAll(filters);
  }

  @Get(':id')
  @Permissions('Listar-tarifa')
  @UseGuards(AuthGuard,RolesGuard)
  findOne(@Param('id') id: string) {
    return this.rateService.findOne(id);
  }

  @Put(':id')
  @Permissions('Editar-tarifa')
  @UseGuards(AuthGuard,RolesGuard)
  update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    return this.rateService.update(id, updateRateDto);
  }

  @Delete(':id')
  @Permissions('Eliminar-tarifa')
  @UseGuards(AuthGuard,RolesGuard)
  remove(@Param('id') id: string) {
    return this.rateService.remove(id);
  }
}
