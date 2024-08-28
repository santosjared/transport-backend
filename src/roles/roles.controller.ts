import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FiltersRolDto } from './dto/filters.dto';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/permission.guard';
import { Permissions } from 'src/auth/decorator/permission.decorator';
@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Permissions('Crear-rol')
  @UseGuards(AuthGuard,RolesGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Permissions('Listar-rol')
  @UseGuards(AuthGuard,RolesGuard)
  async findAll(@Query() query:FiltersRolDto) {
    const {filter}=query
    const items = await this.rolesService.findAll(filter);
    return items;
  }

  @Get(':id')
  @Permissions('Listar-rol')
  @UseGuards(AuthGuard,RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(id);
  }

  @Put(':id')
  @Permissions('Editar-rol')
  @UseGuards(AuthGuard,RolesGuard)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Permissions('Eliminar-rol')
  @UseGuards(AuthGuard,RolesGuard)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
