import { Test, TestingModule } from '@nestjs/testing';
import { FaceidController } from './faceid.controller';
import { FaceidService } from './faceid.service';

describe('FaceidController', () => {
  let controller: FaceidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaceidController],
      providers: [FaceidService],
    }).compile();

    controller = module.get<FaceidController>(FaceidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
