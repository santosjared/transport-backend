import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UsePipes, ValidationPipe, ValidationError, UseGuards } from '@nestjs/common';
import { RoadService } from './road.service';
import { CreateRoadDto } from './dto/create-road.dto';
import { UpdateRoadDto } from './dto/update-road.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FiltersDto } from 'src/utils/filters.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('road')
@ApiBearerAuth()
@ApiTags('road')
export class RoadController {
  constructor(private readonly roadService: RoadService) {}
  
  @Post()
  // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const formatErrors = (errs: ValidationError[], parent = '') => {
        return errs.reduce((acc, err) => {
          const property = parent ? `${parent}.${err.property}` : err.property;
          if (err.children && err.children.length > 0) {
            acc = { ...acc, ...formatErrors(err.children, parent ? parent : err.property) };
          } else {
            acc[err.property] = Object.values(err.constraints || {}).join(', ');
          }
          return acc;
        }, {});
      };

      const formattedErrors = formatErrors(errors);
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))

  async create(@Body() createRoadDto: CreateRoadDto) {
    return this.roadService.create(createRoadDto);
  }

  @Get()
  async findAll(@Query() filters:FiltersDto) {
    return this.roadService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roadService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const formatErrors = (errs: ValidationError[], parent = '') => {
        return errs.reduce((acc, err) => {
          const property = parent ? `${parent}.${err.property}` : err.property;
          if (err.children && err.children.length > 0) {
            acc = { ...acc, ...formatErrors(err.children, parent ? parent : err.property) };
          } else {
            acc[err.property] = Object.values(err.constraints || {}).join(', ');
          }
          return acc;
        }, {});
      };

      const formattedErrors = formatErrors(errors);
      return {
        statusCode: 400,
        message: formattedErrors,
      };
    },
  }))
  async update(@Param('id') id: string, @Body() updateRoadDto: UpdateRoadDto) {
    return this.roadService.update(id, updateRoadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roadService.remove(id);
  }
}
