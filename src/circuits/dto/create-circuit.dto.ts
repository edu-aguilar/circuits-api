import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsUrl,
} from 'class-validator';

class LocationDTO {
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  lat: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  lng: string;
}

class PriceDTO {
  @IsOptional()
  @Min(0, { message: 'Field $property cannot be lower than zero.' })
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsNumber({}, { message: 'Field $property should be a number.' })
  half: number;

  @IsOptional()
  @Min(0, { message: 'Field $property cannot be lower than zero.' })
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsNumber({}, { message: 'Field $property should be a number.' })
  complete: number;
}

class SocialNetworkDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsUrl()
  instagram: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsUrl()
  facebook: string;
}

class BikeSettingsDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  160: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  190: string;
}

export class CreateCircuitDto {
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  name: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  provinceId: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  address: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @ValidateNested({ each: true })
  @Type(() => LocationDTO)
  location: LocationDTO;

  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMinSize(1)
  images: string[];

  @IsOptional()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  description: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  website: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  phone: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @ValidateNested({ each: true })
  @Type(() => PriceDTO)
  price: PriceDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SocialNetworkDTO)
  social: SocialNetworkDTO;

  @IsOptional()
  @Min(0, { message: 'Field $property cannot be lower than zero.' })
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsNumber({}, { message: 'Field $property should be a number.' })
  distance: number;

  @IsOptional()
  @Min(0, { message: 'Field $property cannot be lower than zero.' })
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsNumber({}, { message: 'Field $property should be a number.' })
  width: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BikeSettingsDTO)
  settings: BikeSettingsDTO;
}
