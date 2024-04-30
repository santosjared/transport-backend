import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ChoferesService } from './choferes.service';
import { CreateChofereDto } from './dto/create-chofere.dto';
import { UpdateChofereDto } from './dto/update-chofere.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('choferes')
@ApiTags('choferes')
export class ChoferesController {
  constructor(private readonly choferesService: ChoferesService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{name:'licenceFront'},{name:'licenceBack'}]))
  create(@UploadedFiles() files:{licenceFront?: Express.Multer.File[], licenceBack: Express.Multer.File[]}, @Body() createChofereDto:CreateChofereDto ) {
    return this.choferesService.create(createChofereDto, files);
  }

  @Get()
  findAll() {
    return this.choferesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.choferesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChofereDto: UpdateChofereDto) {
    return this.choferesService.update(+id, updateChofereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.choferesService.remove(+id);
  }
}
