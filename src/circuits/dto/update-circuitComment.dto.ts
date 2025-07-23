import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCircuitCommentDto {
  @IsNotEmpty({ message: 'Field $property cannot be empty.' })
  @IsString({ message: 'Field $property should be a string.' })
  text: string;
}
