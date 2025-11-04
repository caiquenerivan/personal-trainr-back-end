import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Workout } from '@prisma/client';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWorkoutDto): Promise<Workout> {
    try {
      const workout = await this.prisma.workout.create({
        data: {
          title: data.title,
          user: {
            connect: { id: data.userId },
          },
        },
      });
      return workout;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to create workout');
    }
  }

  async findAll(): Promise<Workout[]> {
    try {
      return await this.prisma.workout.findMany({
        include: { exercises: true, user: true },
      });
    } catch {
      throw new InternalServerErrorException('Failed to fetch workouts');
    }
  }

  async findOne(id: number): Promise<Workout> {
    try {
      const workout = await this.prisma.workout.findUnique({
        where: { id },
        include: { exercises: true, user: true },
      });

      if (!workout) {
        throw new NotFoundException(`Workout with ID ${id} not found`);
      }

      return workout;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to fetch workout');
    }
  }

  async update(id: number, data: UpdateWorkoutDto): Promise<Workout> {
    try {
      await this.findOne(id);
      const workout = await this.prisma.workout.update({
        where: { id },
        data: {
          title: data.title,
          user: data.userId ? { connect: { id: data.userId } } : undefined,
        },
      });
      return workout;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to update workout');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.prisma.workout.delete({ where: { id } });
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to delete workout');
    }
  }
}
