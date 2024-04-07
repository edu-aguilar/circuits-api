import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CircuitDocument = Circuit & Document<Types.ObjectId>;

@Schema({ collection: 'circuits' })
export class Circuit {
  @Prop({
    unique: true,
  })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  provinceId: Types.ObjectId;

  @Prop()
  length?: number;
}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);
