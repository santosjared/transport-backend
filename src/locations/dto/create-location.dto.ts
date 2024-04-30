import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    @ApiProperty()
    cords:number []
    @ApiProperty()
    speed:number
    @ApiProperty()
    distance:number
    @ApiProperty()
    user:string
}
