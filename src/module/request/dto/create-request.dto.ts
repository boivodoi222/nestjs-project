import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsInt()
  requestTypeId: number;

  @IsOptional()
  @IsDateString()
  requestdate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
