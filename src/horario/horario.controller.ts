import { Controller, Get, Post, Body, Param, Delete, Put, Query, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/permission.guard';
import { Permissions } from 'src/auth/decorator/permission.decorator';
// import { PermissionsGuard } from 'src/roles/guards/rols.guard';
// import { Permissions } from 'src/roles/decorator/permission.decorator';

@Controller('horario')
@ApiTags('horario')
// @UseGuards(PermissionsGuard)
@ApiBearerAuth()
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}
  @Post()
  @Permissions('Crear-horario')
  @UseGuards(AuthGuard,RolesGuard)
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
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.create(createHorarioDto)
  }

  @Get()
  @Permissions('Listar-horario')
  @UseGuards(AuthGuard,RolesGuard)
  findAll(@Query() filters:FiltersDto) {
    return this.horarioService.findAll(filters);
  }

  @Get(':id')
  @Permissions('Listar-horario')
  @UseGuards(AuthGuard,RolesGuard)
  findOne(@Param('id') id: string) {
    return this.horarioService.findOne(id);
  }

  @Put(':id')
  @Permissions('Editar-horario')
  @UseGuards(AuthGuard,RolesGuard)
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
  @Permissions('Eliminar-horario')
  @UseGuards(AuthGuard,RolesGuard)
  remove(@Param('id') id: string) {
    return this.horarioService.remove(id);
  }
}
