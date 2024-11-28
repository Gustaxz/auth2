import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FaceidService {
  async saveFile(file: Express.Multer.File) {
    try {
      await writeFile(`./uploads/${file.originalname}`, file.buffer);
      return {
        message: 'File saved successfully',
        statusCode: 201,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Error saving file',
        statusCode: 500,
        error,
      };
    }
  }

  async recognition(file: Express.Multer.File) {
    try {
      console.log('Recognition', file);
      return {
        message: 'File saved successfully',
        statusCode: 201,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Error saving file',
        statusCode: 500,
        error,
      };
    }
  }
}
