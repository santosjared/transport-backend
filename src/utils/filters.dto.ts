import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FiltersDto{
    @IsOptional()
    @ApiProperty({type:String, required:false})
    filter:string

    @IsOptional()
    @ApiProperty({type:Number, required:false})
    skip:number

    @IsOptional()
    @ApiProperty({type:Number, required:false})
    limit:number
}