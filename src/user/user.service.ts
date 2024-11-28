import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return await prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await prisma.user.findMany();
  }

  async findOne(id: string) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
