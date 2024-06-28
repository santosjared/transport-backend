import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";


export class AsignedBusDto{
    @ApiProperty({ description: 'Lista de buses' })
    @IsArray({ message: 'Los buses deben ser un arreglo' })
    buses:string[]
}