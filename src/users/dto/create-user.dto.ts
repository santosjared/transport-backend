import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    gender: string;

    @ApiProperty()
    @IsString()
    ci: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty()

    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    profile: string;

    @ApiProperty()
    @Length(6, 20)
    password: string;

    delete?:boolean

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}
