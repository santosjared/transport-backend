import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'

export type ContryDocument = HydratedDocument<Contry>

@Schema()
export class Contry {
    @Prop({type:String,default:()=>uuid()})
    id:string

    @Prop()
    @IsString()
    name:string
}
export const ContrySchema = SchemaFactory.createForClass(Contry)