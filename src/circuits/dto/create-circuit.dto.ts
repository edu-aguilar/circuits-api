import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateCircuitDto {
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  name: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  provinceId: string;

  @IsOptional()
  @Min(0, { message: 'Field $property cannot be lower than zero.' })
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsNumber({}, { message: 'Field $property should be a number.' })
  length: number;
}
