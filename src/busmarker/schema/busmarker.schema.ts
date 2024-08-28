import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'

export type BusMarkerDocument = HydratedDocument<BusMarker>

@Schema()
export class BusMarker{
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop({type:String})
    name:string
}
export const BusMarkerSchema = SchemaFactory.createForClass(BusMarker)