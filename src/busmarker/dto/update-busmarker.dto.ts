import { PartialType } from '@nestjs/swagger';
import { CreateBusmarkerDto } from './create-busmarker.dto';

export class UpdateBusmarkerDto extends PartialType(CreateBusmarkerDto) {}
