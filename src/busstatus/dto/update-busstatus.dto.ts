import { PartialType } from '@nestjs/swagger';
import { CreateBusstatusDto } from './create-busstatus.dto';

export class UpdateBusstatusDto extends PartialType(CreateBusstatusDto) {}
