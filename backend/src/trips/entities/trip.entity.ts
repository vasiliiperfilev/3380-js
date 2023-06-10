import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TripDocument = HydratedDocument<Trip>;

@Schema()
export class Trip {
  @Prop()
  _id: string;

  @Prop({ required: true })
  userId: Date;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  note: string;

  @Prop({ required: true })
  placeIds: string[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);
