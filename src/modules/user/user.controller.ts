/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode, HttpStatus, Get, Put, Param } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/dto';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }


  @Post('/create')
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post('/sendEmail')
  @HttpCode(HttpStatus.NO_CONTENT)
  send(@Body() sendEmailDto: SendEmailDto) {
    return this.userService.sendEmail(sendEmailDto);
  }

}
