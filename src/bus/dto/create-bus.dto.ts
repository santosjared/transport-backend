import { ApiProperty } from "@nestjs/swagger";

export class CreateBusDto {

    @ApiProperty()
    trademark:string
    @ApiProperty()
    model:number
    @ApiProperty()
    type:string
    @ApiProperty()
    plaque:string
    @ApiProperty()
    cantidad:number
    @ApiProperty()
    photo:string
    @ApiProperty()
    ruat:string
    @ApiProperty()
    status:string

    chofer:string 
    location:string

    constructor(partial: Partial<CreateBusDto>) {
        Object.assign(this, partial);
    }
}
