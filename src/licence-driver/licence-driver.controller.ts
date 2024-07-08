import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { LicenceDriverService } from './licence-driver.service';
import { CreateLicenceDriverDto } from './dto/create-licence-driver.dto';
import { UpdateLicenceDriverDto } from './dto/update-licene-driver.dto';
import { FileFieldsInterceptor} from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('licencia')
@ApiTags('licencia')
@ApiBearerAuth()
export class LicenceDriverController {
  constructor(private readonly licenceDriverService: LicenceDriverService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{name:'licenceFront'},{name:'licenceBack'}]))
  create(@UploadedFiles() files:{licenceFront?: Express.Multer.File[], licenceBack: Express.Multer.File[]}, @Body() createChofereDto:CreateLicenceDriverDto ) {  
    return this.licenceDriverService.create(createChofereDto, files);
  }

  @Get()
  findAll() {
    return this.licenceDriverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenceDriverService.findOne(id);
  }
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{name:'licenceFront'},{name:'licenceBack'}]))
  update(@Param('id') id: string,@UploadedFiles() files:{licenceFront?: Express.Multer.File[], licenceBack: Express.Multer.File[]}, @Body() updateChofereDto: UpdateLicenceDriverDto) { 
    return this.licenceDriverService.update(id, updateChofereDto,files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenceDriverService.remove(+id);
  }
}
