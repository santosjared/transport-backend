import { PartialType } from '@nestjs/swagger';
import { CreateDrivelicenceDto } from './create-drivelicence.dto';

export class UpdateDrivelicenceDto extends PartialType(CreateDrivelicenceDto) {}
