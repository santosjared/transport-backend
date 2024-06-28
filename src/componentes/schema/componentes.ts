import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Permission } from "src/permission/schema/permission.schema";
import { v4 as uuidv4} from 'uuid'

export type  ComponentSDocument = HydratedDocument<Components>

@Schema()
export class Components {
    @Prop({type:String, default: ()=>uuidv4(), unique:true})
    id:string
    @Prop()
    name:string
}
export const ComponentsSchma = SchemaFactory.createForClass(Components)