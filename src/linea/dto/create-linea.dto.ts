import { ApiProperty } from "@nestjs/swagger"

export class CreateLineaDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    route:string
    @ApiProperty()
    horario:[]
    @ApiProperty()
    tarifa:[]
    @ApiProperty()
    buses:[]
}
