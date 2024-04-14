import { ApiProperty } from '@nestjs/swagger';

export class CreateCodeDto {
    @ApiProperty()
    code:number
}
