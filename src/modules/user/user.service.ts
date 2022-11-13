import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

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

  // Poner un throw
  async updateResetToken(password: string, reset_token: string) {
    const userFound = await this.findByResetToken(reset_token);
    const encryptedPassword = await this.encryptPassword(password);
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
    
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userFound = await this.findByEmail(email);
    if (userFound) throw new HttpException('Repeating user', HttpStatus.NOT_ACCEPTABLE);
    const encryptedPassword = await this.encryptPassword(password);
    try {
      await this.userRepository.save({ ...createUserDto, password: encryptedPassword });
    } catch {
      throw new HttpException('A problem occurred while creating the user', HttpStatus.NOT_FOUND);
    }
  }
}
