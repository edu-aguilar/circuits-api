import { Test, TestingModule } from '@nestjs/testing';
import { ProvincesController } from './provinces.controller';
import { ProvincesService } from './provinces.service';
import { getModelToken } from '@nestjs/mongoose';
import { Province } from './entities/province.entity';

describe('ProvincesController', () => {
  let controller: ProvincesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvincesController],
      providers: [
        ProvincesService,
        { provide: getModelToken(Province.name), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<ProvincesController>(ProvincesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
