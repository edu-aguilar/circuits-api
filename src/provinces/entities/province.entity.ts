import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProvinceDocument = Province & Document<Types.ObjectId>;

@Schema({ collection: 'provinces' })
export class Province {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Region' })
  regionId: Types.ObjectId;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
