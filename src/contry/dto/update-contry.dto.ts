import { PartialType } from '@nestjs/swagger';
import { CreateContryDto } from './create-contry.dto';

export class UpdateContryDto extends PartialType(CreateContryDto) {}
