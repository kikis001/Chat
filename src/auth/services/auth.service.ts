import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/toke.model';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string):Promise<any>  {
    const user = await this.usersService.findByEmail(email);
    if(user) {
      const isMach = await bcrypt.compare(password, user.password);
      if(isMach) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null
  }

  async generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }
}
