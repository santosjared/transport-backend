import { ApiProperty } from "@nestjs/swagger";

export class CreateTarifaDto {
    @ApiProperty()
    tarifas:[]
    @ApiProperty()
    name:string
    @ApiProperty()
    description:string
}
