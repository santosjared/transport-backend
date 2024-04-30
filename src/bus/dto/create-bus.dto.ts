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
    cantidad:number
    @ApiProperty()
    id:string
    @ApiProperty()
    photo:string
}
