import { PartialType } from '@nestjs/swagger';
import { CreateDiviceDto } from './create-divice.dto';

export class UpdateDiviceDto extends PartialType(CreateDiviceDto) {}
