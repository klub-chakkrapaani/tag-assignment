import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;
@Schema({ timestamps: true, versionKey: false })
export class Tag {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true, unique: true })
  key: string;

  @Prop({ default: [] })
  conditions: [
    { condition: string; keywords: string | string[]; field: string },
  ];

  @Prop({ type: Boolean })
  isDynamic: boolean;

  @Prop({ type: String, default: null })
  resource: string;

  @Prop({ type: String, default: null })
  resourceId: string;

  @Prop({ type: String, default: null })
  resourceType: string;

  @Prop({ type: String })
  createdBy: string;

  @Prop({ type: String })
  updatedBy: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: String })
  deletedBy: string;

  @Prop({ type: Date })
  deletedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
