import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  authorId: string;

  @Prop()
  authorName: string;

  @Prop({ default: false })
  isModerated: boolean;
}

export const ReviewSchema = SchemaFactory.createForClass(Review); 