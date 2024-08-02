import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Req() req: Request) {
    const user = req.body as User
    return this.authService.generateJWT(user)
  }

}
