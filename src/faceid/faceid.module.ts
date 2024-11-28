import { Module } from '@nestjs/common';
import { FaceidService } from './faceid.service';
import { FaceidController } from './faceid.controller';

@Module({
  controllers: [FaceidController],
  providers: [FaceidService],
})
export class FaceidModule {}
