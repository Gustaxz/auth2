import {
  CompareFacesCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { readdir, readFile, writeFile } from 'fs/promises';

@Injectable()
export class FaceidService {
  constructor(private jwtService: JwtService) {}

  private client = new RekognitionClient({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async saveFile(file: Express.Multer.File, userId: string) {
    if (!file) {
      return {
        message: 'No file uploaded',
        statusCode: 400,
      };
    }

    if (!userId) {
      return {
        message: 'No user id provided',
        statusCode: 400,
      };
    }

    try {
      const fileExtension = file.originalname.split('.').pop();
      await writeFile(`./uploads/${userId}.${fileExtension}`, file.buffer);
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

  async recognition(file: Express.Multer.File, userId: string) {
    if (!file) {
      return {
        message: 'No file uploaded',
        statusCode: 400,
      };
    }

    if (!userId) {
      return {
        message: 'No user id provided',
        statusCode: 400,
      };
    }

    try {
      const findFiles = await readdir('./uploads');
      const selectedFileName = findFiles.find((file) => file.includes(userId));
      if (!selectedFileName) {
        return {
          message: 'User not found',
          statusCode: 404,
        };
      }
      const sourceImage = await readFile(`./uploads/${selectedFileName}`);

      const command = new CompareFacesCommand({
        SourceImage: {
          Bytes: sourceImage,
        },
        TargetImage: {
          Bytes: file.buffer,
        },
      });
      const response = await this.client.send(command);
      console.log(response);

      const token = this.jwtService.sign({
        id: userId,
      });

      if (response.FaceMatches && response.FaceMatches.length > 0) {
        return {
          message: 'Face matched',
          statusCode: 200,
          code: token,
        };
      }

      return {
        message: 'Face not matched',
        statusCode: 400,
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
