import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FiltersRolDto{
    @IsOptional()
    @ApiProperty({type:String, required:false})
    filter:string
}