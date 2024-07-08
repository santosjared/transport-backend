import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto{
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
    contry: string;

    @ApiProperty()

    @IsEmail()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    @IsString()
    profile: string;
}
