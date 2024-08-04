import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepo: Repository<User> ) {}

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email }})
  }

  async create(data: CreateUserDto) {
    const email = data.email;
    const userExists = await this.userRepo.findOneBy({email})
    if(userExists){
      throw new InternalServerErrorException('Ha ocurrido algo inesperado')
    }
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.userRepo.save(newUser);
  }
}
