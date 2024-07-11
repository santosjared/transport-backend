import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
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
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('linea')
@ApiTags('linea')
@ApiBearerAuth()
export class LineaController {
  constructor(private readonly lineaService: LineaService) {}

  @UseGuards(JwtAuthGuard)
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

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() filters:FiltersDto) {
    return this.lineaService.findAll(filters);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('requests')
  async requests (){
    return await this.lineaService.requests()
  }

  // @UseGuards(JwtAuthGuard)
  @Get('roads/:id')
  async allRoadsNotAsigned (@Param('id') id:string){
    return await this.lineaService.allRoadNotAsigned(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('allBusNotAsigned')
  async allBusNotAsigned(@Query() filters:FiltersDto){
    return await this.lineaService.allBusNotAsigned(filters)
  }

  @UseGuards(JwtAuthGuard)
  @Get('horarios/:id')
  async horario (@Param('id') id:string){
    return await this.lineaService.allHorarioNotAsigned(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('tarifa/:id')
  async tarifa (@Param('id') id:string){
    return await this.lineaService.allTarifaNotAsigned(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('lineaOne/:id')
  async findLineaOne (@Param('id') id:string){
    return await this.lineaService.findOneLinea(id)
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lineaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
  

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lineaService.remove(id);
  }
}
