import { Test, TestingModule } from '@nestjs/testing';
import { CircuitsController } from './circuits.controller';
import { CircuitsService } from './circuits.service';
import { getModelToken } from '@nestjs/mongoose';
import { Circuit } from './entities/circuit.entity';

describe('CircuitsController', () => {
  let controller: CircuitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CircuitsController],
      providers: [
        CircuitsService,
        { provide: getModelToken(Circuit.name), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<CircuitsController>(CircuitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
