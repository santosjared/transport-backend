import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'


export type LocationsDocument = HydratedDocument<Locations>

@Schema()
export class Locations{
    @Prop({type:String, default:uuid()})
    id:string
    @Prop()
    cords:number[]
    @Prop()
    speed:number
    @Prop()
    distance:number
    @Prop()
    user:string
}
export const locactionsSchema = SchemaFactory.createForClass(Locations)