import { Test, TestingModule } from '@nestjs/testing';
import { SalaryInfoService } from './salary-info.service';

describe('SalaryInfoService', () => {
  let service: SalaryInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryInfoService],
    }).compile();

    service = module.get<SalaryInfoService>(SalaryInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
