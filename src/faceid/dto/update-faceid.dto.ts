import { PartialType } from '@nestjs/mapped-types';
import { CreateFaceidDto } from './create-faceid.dto';

export class UpdateFaceidDto extends PartialType(CreateFaceidDto) {}
