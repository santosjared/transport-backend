import { ApiProperty } from "@nestjs/swagger";

export class CreateHorarioDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    horarioIda:Array<
    {
        place:string,
        firstOut:string
        lastOut:string
        days:[],
        description:string
    }
    >
    @ApiProperty()
    horarioVuelta:Array<
    {
        place:string,
        firstOut:string
        lastOut:string
        days:[],
        description:string
    }
    >
}
