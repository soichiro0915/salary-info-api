import { Test, TestingModule } from '@nestjs/testing';
import { SalaryInfoController } from './salary-info.controller';

describe('SalaryInfoController', () => {
  let controller: SalaryInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryInfoController],
    }).compile();

    controller = module.get<SalaryInfoController>(SalaryInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
