import { Test, TestingModule } from '@nestjs/testing';
import { ProvincesService } from './provinces.service';
import { getModelToken } from '@nestjs/mongoose';
import { Province } from './entities/province.entity';

describe('ProvincesService', () => {
  let service: ProvincesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvincesService,
        { provide: getModelToken(Province.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<ProvincesService>(ProvincesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
