import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
