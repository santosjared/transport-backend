import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';
import { RolesGuard } from 'src/roles/guards/rols.guard';
import { Permissions } from 'src/roles/decorator/permission.decorator';

@Controller('horario')
@ApiTags('horario')
@UseGuards(RolesGuard)
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

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
  @Permissions('Crear')
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.create(createHorarioDto)
  }

  @Get()
  @Permissions('Listar')
  findAll(@Query() filters:FiltersDto) {
    return this.horarioService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioService.findOne(id);
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

  update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horarioService.update(id, updateHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioService.remove(id);
  }
}
