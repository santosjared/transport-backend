import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'


export type DaysDocument = HydratedDocument<Days>

@Schema()
export class Days{
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop({type:String})
    name:string
}

export const DaysSchema = SchemaFactory.createForClass(Days)