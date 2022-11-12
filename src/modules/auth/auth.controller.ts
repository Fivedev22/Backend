import { Controller, Post, Body, Patch, HttpCode, HttpStatus } from '@nestjs/common';
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

  @Patch('/password-reset-request')
  @HttpCode(HttpStatus.OK)
  passwordResetRequest(@Body() passwordResetRequestAuthDto: PasswordResetRequestAuthDto) {
    return this.authService.passwordResetRequest(passwordResetRequestAuthDto);
  }

  @Patch('/password-reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  passwordReset(@Body() passwordReset: PasswordResetAuthDto) {
    return this.authService.passwordReset(passwordReset);
  }
}
