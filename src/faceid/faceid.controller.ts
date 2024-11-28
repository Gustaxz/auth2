import {
  Controller,
  Param,
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
  @Post('saveFile/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async saveFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    return await this.faceidService.saveFile(file, userId);
  }

  @Public()
  @Post('recog/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async recognition(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    return await this.faceidService.recognition(file, userId);
  }
}
