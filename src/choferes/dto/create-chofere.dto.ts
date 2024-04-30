import { ApiProperty } from "@nestjs/swagger";

export class CreateChofereDto {

    @ApiProperty()
    userId:string
    @ApiProperty()
    category:string
    @ApiProperty()
    dateEmition:Date
    @ApiProperty()
    dateExpire:Date
    @ApiProperty()
    licenceFront: string
    @ApiProperty()
    licenceBack:string
}
