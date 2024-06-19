import { PartialType } from '@nestjs/swagger';
import { CreateReportlineaDto } from './create-reportlinea.dto';

export class UpdateReportlineaDto extends PartialType(CreateReportlineaDto) {}
