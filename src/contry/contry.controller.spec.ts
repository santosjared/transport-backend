import { Test, TestingModule } from '@nestjs/testing';
import { ContryController } from './contry.controller';
import { ContryService } from './contry.service';

describe('ContryController', () => {
  let controller: ContryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContryController],
      providers: [ContryService],
    }).compile();

    controller = module.get<ContryController>(ContryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
