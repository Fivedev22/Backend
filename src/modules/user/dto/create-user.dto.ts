
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 60)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 61)
    last_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 60)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string;
}
