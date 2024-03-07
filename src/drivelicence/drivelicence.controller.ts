import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DrivelicenceService } from './drivelicence.service';
import { CreateDrivelicenceDto } from './dto/create-drivelicence.dto';
import { UpdateDrivelicenceDto } from './dto/update-drivelicence.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('drivelicence')
@ApiTags('drivelicence')
export class DrivelicenceController {
  constructor(private readonly drivelicenceService: DrivelicenceService) {}

  @Post()
  async create(@Body() createDrivelicenceDto: CreateDrivelicenceDto) {
    return await this.drivelicenceService.create(createDrivelicenceDto);
  }

  @Get()
  async findAll() {
    return await this.drivelicenceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.drivelicenceService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDrivelicenceDto: UpdateDrivelicenceDto) {
    return await this.drivelicenceService.update(id, updateDrivelicenceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.drivelicenceService.remove(id);
  }
}
