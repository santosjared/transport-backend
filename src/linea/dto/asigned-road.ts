import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class AsignedRoadDto{
    @ApiProperty({ description: 'Lista de rutas' })
    @IsArray({ message: 'Las rutas deben ser un arreglo' })
    road:string[]
}