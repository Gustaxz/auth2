import { Injectable, NotFoundException } from '@nestjs/common';
import { CredentialDto } from './dto/credential.dto';
import { prisma } from 'src/prisma';
import { MailService } from 'src/mail/mail.service';
import { add } from 'date-fns';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailService,
    private jwtService: JwtService,
  ) {}

  async login(credentialDto: CredentialDto) {
    const { email, password } = credentialDto;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new NotFoundException('Invalid password');
    }

    const token = Math.random().toString(36).substring(2);

    await this.mailerService.sendUserConfirmation(user, token);

    const auth = await prisma.auth.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        code: token,
        validatedAt: add(new Date(), { minutes: 5 }),
      },
    });

    return auth;
  }

  async validate(code: string) {
    const auth = await prisma.auth.findFirst({
      where: {
        code,
        validatedAt: {
          gte: new Date(),
          lt: add(new Date(), { minutes: 5 }),
        },
      },
    });

    if (!auth) {
      throw new NotFoundException('Invalid code');
    }

    const token = this.jwtService.sign({
      id: auth.id_user,
    });

    return {
      message: 'Code validated',
      validate: true,
      token,
    };
  }
}
