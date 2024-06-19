import { ApiProperty } from "@nestjs/swagger";

export class AsigneDriverDto{
    @ApiProperty({type:String})
    userId:string
}