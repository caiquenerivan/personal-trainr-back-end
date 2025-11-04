/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.prisma.user.findMany();
      return users;
    } catch (err: unknown) {
      console.log(err);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException(`User with ID ${id} not found`);

      return user;
    } catch (err: unknown) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async create(data: CreateUserDto): Promise<User> {
    try {
      const user: User = await this.prisma.user.create({ data });
      return user;
    } catch (err: unknown) {
      console.log(err);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    try {
      await this.findOne(id);
      const user: User = await this.prisma.user.update({ where: { id }, data });
      return user;
    } catch (err: unknown) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: number): Promise<User> {
    try {
      await this.findOne(id);
      const user: User = await this.prisma.user.delete({ where: { id } });
      return user;
    } catch (err: unknown) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
