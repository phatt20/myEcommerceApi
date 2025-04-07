import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AdminSignUp {
  @ApiProperty({ example: 'example@email.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(255, { message: 'Email is too long' })
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @MinLength(8, { message: 'Password is too short (min 8 characters)' })
  @MaxLength(20, { message: 'Password is too long (max 20 characters)' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/, {
    message: 'Password must contain both uppercase and lowercase letters',
  })
  password: string;
}
export class AdminLogin {
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
