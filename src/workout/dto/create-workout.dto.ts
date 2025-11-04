import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  userId: number;
}
