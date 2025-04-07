import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AppRole } from 'src/utils/enum';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  role: AppRole;
}
