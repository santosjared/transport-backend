import { ApiProperty } from "@nestjs/swagger";

export class CreateRoadDto {
    @ApiProperty()
    geojsonR:string
    @ApiProperty()
    geojsonS:string
    @ApiProperty()
    center:[]
    @ApiProperty()
    zoom:number
    @ApiProperty()
    name:string
}
