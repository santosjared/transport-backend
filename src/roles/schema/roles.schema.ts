import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Components } from "src/componentes/schema/componentes";
import { Users } from "src/users/schema/users.schema";
import { v4 as uuid } from 'uuid';

export type RolDocument = HydratedDocument<Rol>;


@Schema()
export class Rol {
  @Prop({ type: String, default: () => uuid() })
  id: string;

  @Prop()
  name: string;

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Components'}]})
  access: Components[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: null }] })
  Users: Users[];

  @Prop({ type: Boolean, default: false })
  delete: boolean;
}

export const rolSchema = SchemaFactory.createForClass(Rol);
