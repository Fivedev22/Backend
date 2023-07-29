import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SendEmailDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 60)
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 250)
    message: string;
}