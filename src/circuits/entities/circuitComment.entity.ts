import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CircuitCommentDocument = CircuitComment & Document<Types.ObjectId>;

@Schema({ collection: 'circuitComments' })
export class CircuitComment {
  @Prop({ type: Types.ObjectId, ref: 'Circuit' })
  circuitId: Types.ObjectId;

  @Prop()
  userId: string;

  @Prop()
  userName: string;

  @Prop()
  text: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CircuitCommentSchema =
  SchemaFactory.createForClass(CircuitComment);
