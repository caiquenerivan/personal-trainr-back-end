import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from '../../exercise/exercise.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrismaService } from '../prisma/prisma.mock';

describe('ExerciseService', () => {
  let service: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
