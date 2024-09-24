import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CircuitDocument = Circuit & Document<Types.ObjectId>;

@Schema({ collection: 'circuits' })
export class Circuit {
  @Prop({
    unique: true,
  })
  name: string;

  @Prop()
  nameUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  provinceId: Types.ObjectId;

  @Prop()
  address: string;

  @Prop({ type: { lat: String, lng: String } })
  location: { lat: string; lng: string };

  @Prop()
  images: string[];

  @Prop()
  description?: string;

  @Prop()
  website?: string;

  @Prop()
  phone?: string;

  @Prop({ type: { half: Number, complete: Number } })
  price?: { half?: number; complete?: number };

  @Prop({ type: { instagram: String, facebook: String } })
  social?: { instagram?: string; facebook?: string };

  @Prop()
  distance?: number;

  @Prop()
  width?: number;

  @Prop({ type: { 160: Number, 190: Number } })
  settings?: { 160?: number; 190?: number };
}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);
