import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from '../../exercise/exercise.controller';
import { ExerciseService } from '../../exercise/exercise.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrismaService } from '../prisma/prisma.mock';

describe('ExerciseController', () => {
  let controller: ExerciseController;

  const mockExerciseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [
        { provide: ExerciseService, useValue: mockExerciseService },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = module.get<ExerciseController>(ExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
