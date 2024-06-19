import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid } from 'uuid'

export type AuthDocument = HydratedDocument<Auth>

@Schema()
export class Auth{
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop({unique:true})
    email:string
    @Prop()
    password:string
    @Prop({type:Boolean, default:false})
    delete:boolean
}

export const authSchema = SchemaFactory.createForClass(Auth)