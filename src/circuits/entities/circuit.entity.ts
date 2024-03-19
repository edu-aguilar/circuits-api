import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CircuitDocument = Circuit & Document<Types.ObjectId>;

@Schema({ collection: 'circuits' })
export class Circuit {
  @Prop()
  name: string;

  @Prop()
  length?: number;
}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);
