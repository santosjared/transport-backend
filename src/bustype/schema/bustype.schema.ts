import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'


export type BusTypeDocument = HydratedDocument<BusType>

@Schema()
export class BusType{
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop({type:String})
    name:string
}
export const BusTypeSchema = SchemaFactory.createForClass(BusType)