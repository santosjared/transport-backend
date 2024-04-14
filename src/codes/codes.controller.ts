import { Controller, Get, Post, Body} from '@nestjs/common';
import { CodesService } from './codes.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('code')
@ApiTags('code')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @Post()
  create(@Body() createCodeDto: CreateCodeDto) {
    return this.codesService.existsCode(createCodeDto);
  }

  @Get()
  find() {
    return this.codesService.find(5);
  }

}
