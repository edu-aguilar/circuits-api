import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProvinceDocument = Province & Document<MongooseSchema.Types.UUID>;

@Schema({ collection: 'provinces' })
export class Province {
  @Prop({ unique: true })
  name: string;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
