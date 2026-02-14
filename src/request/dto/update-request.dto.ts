import {  IsOptional,  IsInt,  IsString,  IsDateString,  MaxLength,} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  requestTypeId?: number;

  @IsOptional()
  @IsDateString()
  requestdate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsDateString()
  approvedDate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  status?: string;
}
