import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
    @IsNotEmpty()
    @IsString()
    @Length(10, 100)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 100)
    password: string;
}
