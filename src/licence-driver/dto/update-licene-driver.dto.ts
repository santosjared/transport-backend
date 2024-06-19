import { PartialType } from '@nestjs/swagger';
import { CreateLicenceDriverDto } from './create-licence-driver.dto';

export class UpdateLicenceDriverDto extends PartialType(CreateLicenceDriverDto) {}
