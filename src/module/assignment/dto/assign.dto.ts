import { IsInt, IsOptional, IsString } from 'class-validator';

export class AssignDto {
  @IsInt()
  deviceId: number;

  @IsInt()
  departmentId: number;

  @IsInt()
  userId: number;

  @IsOptional()
  assigneddate?: Date; 

  @IsOptional()
  @IsString()
  notes?: string;
}
