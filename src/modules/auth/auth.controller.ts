/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginAuthDto, PasswordResetAuthDto, PasswordResetRequestAuthDto } from 'src/modules/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/password-reset-request')
  @HttpCode(HttpStatus.OK)
  passwordResetRequest(@Body() passwordResetRequestAuthDto: PasswordResetRequestAuthDto) {
    return this.authService.passwordResetRequest(passwordResetRequestAuthDto);
  }

  @Put('/password-reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  passwordReset(@Body() passwordReset: PasswordResetAuthDto) {
    return this.authService.passwordReset(passwordReset);
  }
}
