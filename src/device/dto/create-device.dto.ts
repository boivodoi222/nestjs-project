import { IsString, IsInt, IsDateString, IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  deviceCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  deviceName: string;

  @IsString()
  @IsOptional()
  @Length(0, 200)
  description: string;

  @IsInt()
  deviceTypeId: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9\-]+$/, { message: 'Serial number chỉ được chứa chữ hoa, số và dấu gạch ngang' })
  serialNumber: string;

  @IsString()
  @IsOptional()
  assetTag: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDateString()
  purchaseDate: string;

  @IsDateString()
  @IsNotEmpty()
  warrantyEndDate: string; 

}
