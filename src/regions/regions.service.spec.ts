import { Test, TestingModule } from '@nestjs/testing';
import { RegionsService } from './regions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Region } from './entities/region.entity';

describe('RegionsService', () => {
  let service: RegionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionsService,
        { provide: getModelToken(Region.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<RegionsService>(RegionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
