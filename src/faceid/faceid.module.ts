import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FaceidController } from './faceid.controller';
import { FaceidService } from './faceid.service';

@Module({
  controllers: [FaceidController],
  providers: [FaceidService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET ?? 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class FaceidModule {}
