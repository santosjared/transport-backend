import { Test, TestingModule } from '@nestjs/testing';
import { ContryService } from './contry.service';

describe('ContryService', () => {
  let service: ContryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContryService],
    }).compile();

    service = module.get<ContryService>(ContryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
