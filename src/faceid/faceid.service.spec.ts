import { Test, TestingModule } from '@nestjs/testing';
import { FaceidService } from './faceid.service';

describe('FaceidService', () => {
  let service: FaceidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaceidService],
    }).compile();

    service = module.get<FaceidService>(FaceidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
