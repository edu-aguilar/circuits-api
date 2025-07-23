import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCircuitCommentDto {
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  userId: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  userName: string;

  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  text: string;
}
