import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreatePlayerDto {
  id: number;
  @IsString()
  @IsEmail()
  email: string;
  @IsBoolean()
  banned: boolean;
}
