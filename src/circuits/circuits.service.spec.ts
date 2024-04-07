import { Test, TestingModule } from '@nestjs/testing';
import { CircuitsService } from './circuits.service';
import { getModelToken } from '@nestjs/mongoose';
import { Circuit } from './entities/circuit.entity';
import { Province } from '../provinces/entities/province.entity';

describe('CircuitsService', () => {
  let service: CircuitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CircuitsService,
        { provide: getModelToken(Circuit.name), useValue: jest.fn() },
        { provide: getModelToken(Province.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<CircuitsService>(CircuitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
