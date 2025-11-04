import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrismaService } from '../prisma/prisma.mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
