import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid } from 'uuid'

export type BusStatusDocument = HydratedDocument<BusStatus>

@Schema()
export class BusStatus {
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop({type:String})
    name:string
}

export const BusStatusSchema = SchemaFactory.createForClass(BusStatus)