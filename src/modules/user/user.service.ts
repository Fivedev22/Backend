import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from 'src/modules/user/dto';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

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
<<<<<<< HEAD
    userFound.reset_token = null;
    try {
      await this.userRepository.save({ ...userFound, password: encryptedPassword });
      return {
        estado: 201,
        mensaje: 'Ok',
      };
    } catch (e) {
      return {
        estado: 400,
        mensaje: 'Error',
      };
    }
    
=======
    try {
      userFound.reset_token = null;
      await this.userRepository.save({ ...userFound, password: encryptedPassword });
    } catch (error) {
      throw new HttpException('A problem occurred while updating the reset token', HttpStatus.NOT_FOUND);
    }
>>>>>>> tino
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
}
