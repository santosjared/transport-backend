import { ApiProperty } from "@nestjs/swagger";

export class CreateHorarioDto {
    @ApiProperty()
    horarioIda:Array<
    {
        name:string,
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
        name:string,
        place:string,
        firstOut:string
        lastOut:string
        days:[],
        description:string
    }
    >
}
