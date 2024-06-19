import { ApiProperty } from "@nestjs/swagger";

export class AsignedRateDto{
    @ApiProperty({type:[]})
    rate:string[]
}