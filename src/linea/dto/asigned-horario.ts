import { ApiProperty } from "@nestjs/swagger";


export class AsignedHorarioDto{
    @ApiProperty({type:[]})
    horario:string[]
}