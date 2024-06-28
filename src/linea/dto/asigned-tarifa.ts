import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class AsignedRateDto{

     @ApiProperty({ description: 'Lista de tarifas' })
   @IsArray({ message: 'Las tarifas deben ser un arreglo' })
    rate:string[]
}