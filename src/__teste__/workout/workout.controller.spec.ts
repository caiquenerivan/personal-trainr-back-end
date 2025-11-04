import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutController } from '../../workout/workout.controller';
import { WorkoutService } from '../../workout/workout.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrismaService } from '../prisma/prisma.mock';

describe('WorkoutController', () => {
  let controller: WorkoutController;

  const mockWorkoutService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutController],
      providers: [
        { provide: WorkoutService, useValue: mockWorkoutService },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = module.get<WorkoutController>(WorkoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
