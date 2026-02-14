import { IsInt, 
    IsNotEmpty, 
    IsOptional, 
    IsString 
} from "class-validator";

export class UpdateDisposalDto {
    @IsString()
    @IsNotEmpty()
    finalStatus: string;

    @IsOptional()
    @IsString()
    notes?: string;

}