import { ApiProperty } from "@nestjs/swagger";

export class CreateLicenceDriverDto {
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
