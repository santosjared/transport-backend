import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {v4 as uuidv4} from 'uuid'

export type DaysDocument = HydratedDocument<Days>

@Schema()
export class Days {
    @Prop({type:String, default:()=>uuidv4(), unique:true})
    uuid:string;
    @Prop({unique:true, required:true})
    name:string
}
export const DaysSchema = SchemaFactory.createForClass(Days)