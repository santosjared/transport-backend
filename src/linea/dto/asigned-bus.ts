import { ApiProperty } from "@nestjs/swagger";


export class AsignedBusDto{
    @ApiProperty({type:[]})
    buses:string[]
}