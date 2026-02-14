import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDisposalDto {
  @IsInt()
  @IsNotEmpty()
  deviceId: number;

  @IsOptional()
  disposaldate: Date;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  finalStatus: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
