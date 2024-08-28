import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContryService } from './contry.service';
import { CreateContryDto } from './dto/create-contry.dto';
import { UpdateContryDto } from './dto/update-contry.dto';

@Controller('contry')
export class ContryController {
  constructor(private readonly contryService: ContryService) {}

  // @Post()
  // create(@Body() createContryDto: CreateContryDto) {
  //   return this.contryService.create(createContryDto);
  // }

  @Get()
  findAll() {
    return this.contryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contryService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContryDto: UpdateContryDto) {
  //   return this.contryService.update(+id, updateContryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contryService.remove(+id);
  // }
}
