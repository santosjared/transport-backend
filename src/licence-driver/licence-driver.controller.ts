import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UploadedFiles, Put, UseGuards } from '@nestjs/common';
import { LicenceDriverService } from './licence-driver.service';
import { CreateLicenceDriverDto } from './dto/create-licence-driver.dto';
import { UpdateLicenceDriverDto } from './dto/update-licene-driver.dto';
import { FileFieldsInterceptor} from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('licencia')
@ApiTags('licencia')
@ApiBearerAuth()
export class LicenceDriverController {
  constructor(private readonly licenceDriverService: LicenceDriverService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{name:'licenceFront'},{name:'licenceBack'}]))
  create(@UploadedFiles() files:{licenceFront?: Express.Multer.File[], licenceBack: Express.Multer.File[]}, @Body() createChofereDto:CreateLicenceDriverDto ) {  
    return this.licenceDriverService.create(createChofereDto, files);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.licenceDriverService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenceDriverService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{name:'licenceFront'},{name:'licenceBack'}]))
  update(@Param('id') id: string,@UploadedFiles() files:{licenceFront?: Express.Multer.File[], licenceBack: Express.Multer.File[]}, @Body() updateChofereDto: UpdateLicenceDriverDto) { 
    return this.licenceDriverService.update(id, updateChofereDto,files);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenceDriverService.remove(+id);
  }
}
