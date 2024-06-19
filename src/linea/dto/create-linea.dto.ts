import { ApiProperty } from "@nestjs/swagger"

export class CreateLineaDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    road:string
    @ApiProperty()
    horario:string[]
    @ApiProperty()
    rate:string[]
    @ApiProperty()
    buses:string[]

    constructor(partial: Partial<CreateLineaDto>) {
        Object.assign(this, partial);
    }
}
