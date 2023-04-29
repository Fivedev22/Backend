import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/modules/auth/jwt';
import {
  LoginAuthDto,
  PasswordResetAuthDto,
  PasswordResetRequestAuthDto,
} from 'src/modules/auth/dto';
import { UserService } from 'src/modules/user/user.service';
import { v4 } from 'uuid';
import { transporter } from 'src/config/nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    const userFound = await this.userService.findByUsername(username);
<<<<<<< HEAD
    try {
      if (!userFound)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      const checkPassword = await this.userService.checkPassword(
        password,
        userFound.password,
      );
      if (!checkPassword)
        throw new HttpException(
          'Password incorrect',
          HttpStatus.NOT_ACCEPTABLE,
        );
      const payload: JwtPayload = { username: userFound.username };
      const token = this.jwtService.sign(payload);
      console.log(token);
      return { token };
    } catch {
      throw new HttpException('Datos incorrectos', HttpStatus.NOT_FOUND);
    }
=======
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const checkPassword = await this.userService.checkPassword(password, userFound.password);
    if (!checkPassword) throw new HttpException('Password incorrect', HttpStatus.NOT_ACCEPTABLE);
    const payload: JwtPayload = { username: userFound.username }
    const token = this.jwtService.sign(payload);
    return { token };
>>>>>>> tino
  }

  async passwordResetRequest(
    passwordResetRequestAuthDto: PasswordResetRequestAuthDto,
  ) {
    const { email } = passwordResetRequestAuthDto;
    const userFound = await this.userService.findByEmail(email);
    if (!userFound)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const resetToken = v4();
    userFound.reset_token = resetToken;
    const slug = `http://localhost:4200/login/password-reset/${resetToken}`;
    const message = {
      from: 'support.anahi-departamentos.com',
      to: userFound.email,
      subject: 'Password reset request',
      html: `
            <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <!--100% body table--> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:20px;">&nbsp;</td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;">&nbsp;</td> </tr> <tr> <td style="padding:0 35px;"> <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"> You have requested to reset your password</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span> <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"> We cannot simply send you your old password. A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions. </p> <a href="${slug}" target="_blank" style="background:#4666f3;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:5px;">Reset Password</a> </td> </tr> <tr> <td style="height:40px;">&nbsp;</td> </tr> </table> </td> <tr> <td style="height:20px;">&nbsp;</td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.74); line-height:18px; margin:0 0 0;"> <strong>support.anahidepartamentos.com</strong> </p> </td> </tr> <tr> <td style="height:80px;">&nbsp;</td> </tr> </table> </td> </tr> </table></body>
          `,
    };
    try {
      await transporter.sendMail(message);
      await this.userService.addResetToken(email, resetToken);
<<<<<<< HEAD

      return { resetToken }
=======
      return { resetToken };
>>>>>>> tino
    } catch {
      throw new HttpException(
        'An error occurred while sending the email',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async passwordReset(passwordResetAuthDto: PasswordResetAuthDto) {
    const { reset_token, new_password } = passwordResetAuthDto;
    await this.userService.updateResetToken(new_password, reset_token);
  }
}
