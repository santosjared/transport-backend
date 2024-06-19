import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'

export type RateDocument = HydratedDocument<Rate>

@Schema()
export class Rate{
    @Prop({type:String, default:()=>uuidv4(), unique:true})
    id:string
    @Prop()
    rates:[]
    @Prop()
    name:string
    @Prop()
    description:string
    @Prop({type:Date, default:Date.now})
    createdAt:Date
    @Prop({type:Boolean, default:false})
    delete:boolean
}

export const rateSchema = SchemaFactory.createForClass(Rate)