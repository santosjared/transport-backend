import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateContryDto {
    @ApiProperty()
    @IsString()
    name:string
}
