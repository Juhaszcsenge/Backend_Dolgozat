import { IsNumber, IsString,Min,MinLength } from "class-validator";

export class CreateCharacterDto {
    @IsString()
    @MinLength(3)
    name: string;
    @IsNumber()
    @Min(0)
    experience: number;
}
