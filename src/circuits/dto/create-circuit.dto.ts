import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCircuitDto {
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  name: string;

  @IsNumber({}, { message: 'Field $property should be a number.' })
  length?: number;
}
