import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';

@Controller('tarifa')
@ApiTags('tarifa')
export class TarifaController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  create(@Body() createRatefaDto: CreateRateDto) {
    return this.rateService.create(createRatefaDto);
  }

  @Get()
  findAll(@Query() filters:FiltersDto) {
    return this.rateService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    return this.rateService.update(id, updateRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rateService.remove(id);
  }
}
