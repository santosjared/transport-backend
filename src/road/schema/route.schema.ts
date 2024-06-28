import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Route {
  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  parada: boolean;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
export type RouteDocument = Route & Document;
