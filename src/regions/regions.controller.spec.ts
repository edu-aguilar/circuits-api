import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Region } from './entities/region.entity';

describe('RegionsController', () => {
  let controller: RegionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionsController],
      providers: [
        RegionsService,
        { provide: getModelToken(Region.name), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<RegionsController>(RegionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
