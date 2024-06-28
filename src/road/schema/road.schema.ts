import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Route, RouteSchema } from './route.schema';  // Asegúrate de importar correctamente

export type RoadDocument = HydratedDocument<Road>;

@Schema()
export class Road {
  @Prop({ type: String, default: () => uuidv4(), required: true })
  id: string;

  @Prop({ type: Object })
  geojson: any;

  @Prop()
  center: number[];

  @Prop()
  zoom: number;

  @Prop()
  name: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Boolean, default: false })
  delete: boolean;

  @Prop({ type: [], default: [] }) 
  routes: string[];
}

export const RoadSchema = SchemaFactory.createForClass(Road);
