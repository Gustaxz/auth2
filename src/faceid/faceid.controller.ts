import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorator/token.decorator';
import { FaceidService } from './faceid.service';

@Controller('faceid')
export class FaceidController {
  constructor(private readonly faceidService: FaceidService) {}

  @Public()
  @Post('saveFile')
  @UseInterceptors(FileInterceptor('file'))
  async saveFile(@UploadedFile() file: Express.Multer.File) {
    return await this.faceidService.saveFile(file);
  }

  @Public()
  @Post('recog')
  @UseInterceptors(FileInterceptor('file'))
  async recognition(@UploadedFile() file: Express.Multer.File) {
    return await this.faceidService.recognition(file);
  }
}
