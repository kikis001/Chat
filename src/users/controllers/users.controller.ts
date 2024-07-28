import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  
  constructor(private usersServices: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersServices.create(user);
  }
}
