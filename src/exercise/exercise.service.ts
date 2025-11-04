import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from '@prisma/client';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateExerciseDto): Promise<Exercise> {
    try {
      return await this.prisma.exercise.create({ data });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to create exercise');
    }
  }

  async findAll(): Promise<Exercise[]> {
    try {
      return await this.prisma.exercise.findMany({
        include: { workout: true },
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch exercises');
    }
  }

  async findOne(id: number): Promise<Exercise> {
    try {
      const exercise = await this.prisma.exercise.findUnique({
        where: { id },
        include: { workout: true },
      });
      if (!exercise) {
        throw new NotFoundException(`Exercise with ID ${id} not found`);
      }
      return exercise;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to fetch exercise');
    }
  }

  async update(id: number, data: UpdateExerciseDto): Promise<Exercise> {
    try {
      const existing = await this.prisma.exercise.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Exercise with ID ${id} not found`);
      return await this.prisma.exercise.update({
        where: { id },
        data,
      });
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to update exercise');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const existing = await this.prisma.exercise.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Exercise with ID ${id} not found`);
      await this.prisma.exercise.delete({ where: { id } });
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to delete exercise');
    }
  }
}
