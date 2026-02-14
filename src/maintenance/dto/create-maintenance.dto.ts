import {IsInt,IsNotEmpty,IsOptional,IsString,IsNumber,MaxLength} 
from 'class-validator';

export class CreateMaintenanceDto {
  @IsNotEmpty()
  deviceId: number;

  @IsNotEmpty()
  @IsInt()
  reportedBy: number;

  @IsOptional()
  maintenancedate?: Date;

  @IsOptional()
  nextMaintenancedate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;


  @IsString()
  status: string;

  @IsNumber()
  cost: number;
}


