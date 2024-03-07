import { ApiProperty } from "@nestjs/swagger";

export class CreateDrivelicenceDto {
    @ApiProperty()
    user:string
    @ApiProperty()
    numberLicence:string
    @ApiProperty()
    emetion:string
    @ApiProperty()
    expiration:string
    @ApiProperty()
    category:string
    @ApiProperty()
    front:string
    @ApiProperty()
    back:string
}
