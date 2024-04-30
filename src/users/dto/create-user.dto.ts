import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    name:string
    @ApiProperty()
    lastName:string
    @ApiProperty()
    gender:string
    @ApiProperty()
    ci:string
    @ApiProperty()
    phone:string
    @ApiProperty()
    address:string
    @ApiProperty()
    contry:string
    @ApiProperty()
    city:string
    @ApiProperty()
    profile:string

}
