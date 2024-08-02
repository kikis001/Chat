import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepo: Repository<User> ) {}

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email }})
    if(!user) {
      throw new NotFoundException('User not found')
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.userRepo.save(newUser);
  }
}
