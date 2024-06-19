import { ApiProperty } from "@nestjs/swagger";

export class CreateHorarioDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    place:string
    @ApiProperty()
    firstOut:string
    @ApiProperty()
    lastOut:string
    @ApiProperty()
    days:string[]
    @ApiProperty()
    otherDay:string
    @ApiProperty()
    description:string
}
