import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RegionDocument = Region & Document<Types.ObjectId>;

@Schema({ collection: 'regions' })
export class Region {
  @Prop({ unique: true })
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
