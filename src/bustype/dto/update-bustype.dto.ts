import { PartialType } from '@nestjs/swagger';
import { CreateBustypeDto } from './create-bustype.dto';

export class UpdateBustypeDto extends PartialType(CreateBustypeDto) {}
