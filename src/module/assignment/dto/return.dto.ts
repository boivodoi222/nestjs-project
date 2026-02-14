import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class ReturnDto {
    @IsOptional()
    @IsInt()
    deviceId?: number;
    
    @IsOptional()
    @IsInt()
    departmentId?: number;

    @IsOptional()
    @IsInt()
    userId?: number;

    @IsOptional()
    assigneddate?: Date;
    
    @IsOptional()
    @IsDateString()
    returneddate?: Date;

    @IsOptional()
    @IsString()
    notes?: string;
}