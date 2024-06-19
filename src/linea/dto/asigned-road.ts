import { ApiProperty } from "@nestjs/swagger";

export class AsignedRoadDto{
    @ApiProperty({type:String})
    road:string
}