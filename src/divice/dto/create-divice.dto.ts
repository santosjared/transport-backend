import { ApiProperty } from "@nestjs/swagger";

export class CreateDiviceDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    brand:string
    @ApiProperty()
    model:string
}
