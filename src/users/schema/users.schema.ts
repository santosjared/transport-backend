import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'

export type UsersDocument = HydratedDocument <Users>

@Schema()
export class Users {
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop()
    name:string
    @Prop()
    lastName:string
    @Prop()
    gender:string
    @Prop()
    ci:string
    @Prop()
    phone:string
    @Prop()
    address:string
    @Prop()
    contry:string
    @Prop()
    city:string
    @Prop()
    profile:string
    @Prop({type:Boolean, default:true})
    status:boolean
}
export const UsersSchema = SchemaFactory.createForClass(Users)