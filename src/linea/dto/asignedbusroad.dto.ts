import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";


export class AsignedBusRoadDto{
    @ApiProperty({ description: 'asignar rutas' })
    @IsString({message:'el ide debe ser una cadena de caracteres '})
    road:string
    @ApiProperty({ description: 'asignar rutas' })
    @IsString({message:'el ide debe ser una cadena de caracteres '})
    busId:string
}