import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

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
    country: string;

    @ApiProperty()

    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    profile: string;
}
