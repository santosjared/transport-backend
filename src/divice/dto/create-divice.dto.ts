import { ApiProperty } from "@nestjs/swagger";

export class CreateDiviceDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    brand:string
    @ApiProperty()
    user:string
    @ApiProperty()
    key:string
    @ApiProperty()
    idUser:string
}
