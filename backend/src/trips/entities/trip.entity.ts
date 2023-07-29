import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TripDocument = HydratedDocument<Trip>;

@Schema()
export class Trip {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  note: string;

  @Prop({ required: true })
  placeIds: string[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);
