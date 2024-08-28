import { ApiProperty } from "@nestjs/swagger";

export class CreateRateDto {
    @ApiProperty()
    rates:any[]
    @ApiProperty()
    name:string
    @ApiProperty()
    description:string
}
