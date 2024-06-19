import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'

export type RolDocument = HydratedDocument<Rol>

@Schema()
export class Rol{

    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop()
    name:string
    @Prop({type:Boolean, default:false})
    delete:boolean
}
export const rolSchema = SchemaFactory.createForClass(Rol)