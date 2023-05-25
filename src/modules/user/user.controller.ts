/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode, HttpStatus, Get, Put, Param } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/dto';

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

}
