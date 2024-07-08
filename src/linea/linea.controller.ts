import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { LineaService } from './linea.service';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';
import { AsignedRoadDto } from './dto/asigned-road';
import { AsignedHorarioDto } from './dto/asigned-horario';
import { AsignedRateDto} from './dto/asigned-tarifa';
import { AsignedBusDto } from './dto/asigned-bus';
import { AsignedBusRoadDto } from './dto/asignedbusroad.dto';
import { Console } from 'console';

@Controller('linea')
@ApiTags('linea')
@ApiBearerAuth()
export class LineaController {
  constructor(private readonly lineaService: LineaService) {}

  @Post()
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
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

  @Get('roads/:id')
  async allRoadsNotAsigned (@Param('id') id:string){
    return await this.lineaService.allRoadNotAsigned(id)
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
  @Get('lineaOne/:id')
  async findLineaOne (@Param('id') id:string){
    return await this.lineaService.findOneLinea(id)
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lineaService.findOne(id);
  }
  @Put('desasigned/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async desasignedRoad(@Param('id') id: string, @Body() desasignedRoad:AsignedRoadDto) {
    return await this.lineaService.desasignedRoad(id, desasignedRoad);
  }
  @Put('asigned/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async asignedRoad(@Param('id') id: string, @Body() asignedRoad:AsignedRoadDto){
    return await this.lineaService.asignedRoad(id,asignedRoad)
  }
  
  @Put('desasignedHorario/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async desasignedHorario(@Param('id') id: string, @Body() desasignedHorario:AsignedHorarioDto){
    return await this.lineaService.desasignedHorario(id,desasignedHorario)
  }
  @Put('asignedHorario/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async asignedHorario(@Param('id') id: string, @Body() asignedHorario:AsignedHorarioDto){
    return await this.lineaService.asignedHorario(id,asignedHorario)
  }

  @Put('desasignedTarifa/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async desasignedTarifa(@Param('id') id: string, @Body() desasignedTarifa:AsignedRateDto){
    return await this.lineaService.desasignedTarifa(id,desasignedTarifa)
  }
  @Put('asignedTarifa/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async asignedTarifa(@Param('id') id: string, @Body() asignedTarifa:AsignedRateDto){
    return await this.lineaService.asignedTarifa(id,asignedTarifa)
  }

  @Put('desasignedBus/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async desasignedBus(@Param('id') id: string, @Body() desasignedBus:AsignedBusDto){
    return await this.lineaService.desasignedBus(id,desasignedBus)
  }
  @Put('asignedBus/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async asignedBus(@Param('id') id: string, @Body() asignedBus:AsignedBusDto){
    return await this.lineaService.asignedBus(id,asignedBus)
  }

  @Put('asignedBusRuta/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async asignedBusRuta(@Param('id') id: string, @Body() asignedBusroad:AsignedBusRoadDto){
    return await this.lineaService.asignedBusRuta(id,asignedBusroad)
  }
  @Put('desasignedBusRuta/:id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async desasignedBusRuta(@Param('id') id: string, @Body() asignedBusroad:AsignedBusRoadDto){
    return await this.lineaService.desasignedBusRuta(id,asignedBusroad)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = {};
      errors.forEach(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        formattedErrors[error.property] = constraints.join(', ');
      });
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async update(@Param('id') id: string, @Body() updateLineaDto: UpdateLineaDto) {
    return await this.lineaService.update(id, updateLineaDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lineaService.remove(id);
  }
}
