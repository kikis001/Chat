import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/auth/models/roles.model";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsNotEmpty()
  @IsString()
  readonly role: Role 
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}