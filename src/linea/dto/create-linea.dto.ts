import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateLineaDto {
    @ApiProperty({ description: 'Nombre de la linea' })
    @IsString({ message: 'El el campo linea debe ser una cadena de caracteres' })
    @IsNotEmpty({ message: 'El el campo linea no puede estar vacío' })
    name:string

    @ApiProperty({ description: 'Lista de rutas' })
    @IsArray({ message: 'Las rutas deben ser un arreglo' })
    road:[]

    @ApiProperty({ description: 'Lista de horarios' })
     @IsArray({ message: 'Los horarios deben ser un arreglo' })
    horario:string[]

    @ApiProperty({ description: 'Lista de tarifas' })
    @IsArray({ message: 'Las tarifas deben ser un arreglo' })
    rate:string[]

    @ApiProperty({ description: 'Lista de buses' })
   @IsArray({ message: 'Los buses deben ser un arreglo' })
    buses:string[]

    constructor(partial: Partial<CreateLineaDto>) {
        Object.assign(this, partial);
    }
}
