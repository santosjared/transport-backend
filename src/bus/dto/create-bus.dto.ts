import { ApiProperty } from "@nestjs/swagger";

export class CreateBusDto {
    @ApiProperty()
    trademark:string
    @ApiProperty()
    model:string
    @ApiProperty()
    type:string
    @ApiProperty()
    plaque:string
    @ApiProperty()
    numberSeating:number
    @ApiProperty()
    fuel:string
    @ApiProperty()
    photo:string
}
