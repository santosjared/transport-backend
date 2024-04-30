import { PartialType } from '@nestjs/swagger';
import { CreateChofereDto } from './create-chofere.dto';

export class UpdateChofereDto extends PartialType(CreateChofereDto) {}
