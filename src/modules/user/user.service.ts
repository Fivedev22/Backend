/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from 'src/modules/user/dto';
import { User } from 'src/modules/user/user.entity';
import { SendEmailDto } from './dto/send-email.dto';
import { transporterGmail } from 'src/config/send_email';
// import  {transporterGmail}  from 'src/config/configuration';


@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async getAllUsers() {
    return await this.userRepository.find({})
  }

  async findByUsername(username: string) {
    const userFound = await this.userRepository.findOne({ where: { username } });
    return userFound;
  }

  async findByEmail(email: string) {
    const userFound = await this.userRepository.findOne({ where: { email } });
    return userFound;
  }

  async findByResetToken(reset_token: string) {
    const userFound = await this.userRepository.findOne({ where: { reset_token } });
    return userFound;
  }

  async checkPassword(password: string, hashPassword: string) {
    const confirmPassword = await compare(password, hashPassword);
    return confirmPassword;
  }

  async encryptPassword(password: string) {
    const encryptedPassword = await hash(password, 10);
    return encryptedPassword;
  }

  async addResetToken(email: string, reset_token: string) {
    const userFound = await this.findByEmail(email);
    userFound.reset_token = reset_token;
    await this.userRepository.save(userFound);
  }

  async updateResetToken(password: string, reset_token: string) {
    const userFound = await this.findByResetToken(reset_token);
    if (!userFound) throw new HttpException('Incorrect reset token', HttpStatus.NOT_FOUND);
    const encryptedPassword = await this.encryptPassword(password);
    try {
      userFound.reset_token = null;
      await this.userRepository.save({ ...userFound, password: encryptedPassword });
    } catch (error) {
      throw new HttpException('A problem occurred while updating the reset token', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    if (await this.findByEmail(email)) throw new HttpException('Repeating user', HttpStatus.NOT_ACCEPTABLE);
    const encryptedPassword = await this.encryptPassword(password);
    try {
      await this.userRepository.save({ ...createUserDto, password: encryptedPassword });
    } catch {
      throw new HttpException('A problem occurred while creating the user', HttpStatus.NOT_FOUND);
    }
  }

  async sendEmail(send: SendEmailDto) {
    const { name, email, message } = send

    const mailOptions = {
      from: 'soporteanahi@gmail.com',
      to: 'agusmartinezy30@gmail.com', // Reemplaza con el correo del destinatario
      subject: 'Nuevo formulario recibido',
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
      html: `
    <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <!--100% body table--> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:20px;">&nbsp;</td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;">&nbsp;</td> </tr> <tr> <td style="padding:0 35px;"> <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Alguien te ha dejado una sugerencia</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span> <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">Nombre: ${name}</p> <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">Correo electronico: ${email}</p><p style="color:#455056; font-size:15px;line-height:24px; margin:0;">Mensaje: ${message}</p></td> </tr> <tr> <td style="height:40px;">&nbsp;</td> </tr> </table> </td> <tr> <td style="height:20px;">&nbsp;</td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.74); line-height:18px; margin:0 0 0;"></p> </td> </tr> <tr> <td style="height:80px;">&nbsp;</td> </tr> </table> </td> </tr> </table></body>
  `,
    };

    // Enviar el correo
    transporterGmail.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new HttpException('Error al enviar mail', HttpStatus.NOT_ACCEPTABLE);

      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
  }
}
