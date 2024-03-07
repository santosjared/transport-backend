import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";
import messages from "../../utils/messages";

export class CreateDayDto {
    @IsNotEmpty({message:messages.IsRequerid})
    @Matches(/^[a-zA-Z]$/,{message:messages.Isletters})
    @ApiProperty()
    name:string
}
