import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { LineaService } from './linea.service';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';
import { AsignedRoadDto } from './dto/asigned-road';
import { AsignedHorarioDto } from './dto/asigned-horario';
import { AsignedRateDto} from './dto/asigned-tarifa';
import { AsignedBusDto } from './dto/asigned-bus';

@Controller('linea')
@ApiTags('linea')
export class LineaController {
  constructor(private readonly lineaService: LineaService) {}

  @Post()
  create(@Body() createLineaDto: CreateLineaDto) {
    return this.lineaService.create(createLineaDto);
  }

  @Get()
  findAll(@Query() filters:FiltersDto) {
    return this.lineaService.findAll(filters);
  }

  @Get('requests')
  async requests (){
    return await this.lineaService.requests()
  }

  @Get('allBusNotAsigned')
  async allBusNotAsigned(@Query() filters:FiltersDto){
    return await this.lineaService.allBusNotAsigned(filters)
  }
  @Get('horarios/:id')
  async horario (@Param('id') id:string){
    return await this.lineaService.allHorarioNotAsigned(id)
  }
  @Get('tarifa/:id')
  async tarifa (@Param('id') id:string){
    return await this.lineaService.allTarifaNotAsigned(id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lineaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLineaDto: UpdateLineaDto) {
    return await this.lineaService.update(id, updateLineaDto);
  }

  @Put('desasigned/:id')
  async desasignedRoad(@Param('id') id: string) {
    return await this.lineaService.desasignedRoad(id);
  }
  @Put('asigned/:id')
  async asignedRoad(@Param('id') id: string, @Body() asignedRoad:AsignedRoadDto){
    return await this.lineaService.asignedRoad(id,asignedRoad)
  }
  
  @Put('desasignedHorario/:id')
  async desasignedHorario(@Param('id') id: string, @Body() desasignedHorario:AsignedHorarioDto){
    return await this.lineaService.desasignedHorario(id,desasignedHorario)
  }
  @Put('asignedHorario/:id')
  async asignedHorario(@Param('id') id: string, @Body() asignedHorario:AsignedHorarioDto){
    return await this.lineaService.asignedHorario(id,asignedHorario)
  }

  @Put('desasignedTarifa/:id')
  async desasignedTarifa(@Param('id') id: string, @Body() desasignedTarifa:AsignedRateDto){
    return await this.lineaService.desasignedTarifa(id,desasignedTarifa)
  }
  @Put('asignedTarifa/:id')
  async asignedTarifa(@Param('id') id: string, @Body() asignedTarifa:AsignedRateDto){
    return await this.lineaService.asignedTarifa(id,asignedTarifa)
  }

  @Put('desasignedBus/:id')
  async desasignedBus(@Param('id') id: string, @Body() desasignedBus:AsignedBusDto){
    return await this.lineaService.desasignedBus(id,desasignedBus)
  }
  @Put('asignedBus/:id')
  async asignedBus(@Param('id') id: string, @Body() asignedBus:AsignedBusDto){
    return await this.lineaService.asignedBus(id,asignedBus)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lineaService.remove(id);
  }
}
