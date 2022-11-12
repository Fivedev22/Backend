import { IsNotEmpty, IsEmail } from 'class-validator';

export class PasswordResetRequestAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
