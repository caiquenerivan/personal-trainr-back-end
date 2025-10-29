import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // lê o .env
    PrismaModule, // PrismaService global
    AuthModule, // módulo de autenticação
    UserModule, // módulo de usuários
    WorkoutModule, // módulo de treinos
    ExerciseModule, // módulo de exercícios
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
