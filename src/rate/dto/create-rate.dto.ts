import { ApiProperty } from "@nestjs/swagger";

export class CreateRateDto {
    @ApiProperty()
    rates:[]
    @ApiProperty()
    name:string
    @ApiProperty()
    description:string
}
