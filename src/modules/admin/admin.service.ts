import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entity/user.entity';
import { AppRole } from 'src/utils/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/users.dto';
import { AdminLogin, AdminSignUp } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async create(data: AdminSignUp): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await this.hashPassword(data.password);

    const dataAcc = {
      email: data.email,
      password: hashedPassword,
      role: AppRole.ADMIN,
    };

    const newUser = this.usersRepository.create(dataAcc);
    const savedUser = await this.usersRepository.save(newUser);

    const { password, ...result } = savedUser;
    return result;
  }
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'password', 'role'],
    });
    if (user && this.comparePassword(pass, user.password)) {
      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    }
    return null;
  }
  async login(data: AdminLogin): Promise<any> {
    const { email, password } = data;
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    // const token = this.jwtService.sign(
    //   { userId: user.id, email: user.email, role: user.role },
    //   { expiresIn: '24h' },
    // );
    // return { token };
  }
}
