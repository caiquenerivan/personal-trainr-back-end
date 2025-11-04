import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutService } from '../../workout/workout.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrismaService } from '../prisma/prisma.mock';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<WorkoutService>(WorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
