import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";


export class AsignedHorarioDto{
    @ApiProperty({ description: 'Lista de horarios' })
    @IsArray({ message: 'Los horarios deben ser un arreglo' })
    horario:string[]
}