import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { v4 as uuidv4} from 'uuid'

export type PermissionDocument = HydratedDocument<Permission>

@Schema()
export class Permission{
    @Prop({type:String, default: ()=>uuidv4(), unique:true})
    id:string
    @Prop()
    name:string
}
export const PermissionSchema = SchemaFactory.createForClass(Permission)