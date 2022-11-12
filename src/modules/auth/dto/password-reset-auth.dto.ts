import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PasswordResetAuthDto {
    @IsNotEmpty()
    @IsUUID('4')
    reset_token: string;

    @IsNotEmpty()
    @IsString()
    new_password: string;
}
