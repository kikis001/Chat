import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  
  constructor(private usersServices: UsersService) {}

  @Public()
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersServices.create(user);
  }
}
