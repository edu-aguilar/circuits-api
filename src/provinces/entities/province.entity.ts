import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProvinceDocument = Province & Document<MongooseSchema.Types.UUID>;

@Schema({ collection: 'provinces' })
export class Province {
  @Prop({
    type: String,
    default: () => randomUUID(),
  })
  _id: string;

  @Prop()
  name: string;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
