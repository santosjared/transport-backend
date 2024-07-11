import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('tarifa')
@ApiTags('tarifa')
@ApiBearerAuth()
export class TarifaController {
  constructor(private readonly rateService: RateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRatefaDto: CreateRateDto) {
    return this.rateService.create(createRatefaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() filters:FiltersDto) {
    return this.rateService.findAll(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    return this.rateService.update(id, updateRateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rateService.remove(id);
  }
}
