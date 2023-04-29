import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ImagePropertyDto {
  @IsNotEmpty()
  @IsString()
  filename: string;
}