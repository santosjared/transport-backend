import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'

export type DiviceDocument = HydratedDocument<Divice>

@Schema()
export class Divice{
    @Prop({type:String, default:()=>uuidv4()})
    id:string
    @Prop()
    name:string
    @Prop()
    brand:string
    @Prop({unique:true})
    user:string
    @Prop()
    key:string
    @Prop()
    idUser:string
    @Prop({type:Boolean, default:false})
    connect:boolean
    @Prop({type:Boolean, default:true})
    status:boolean
}
export const DiviceSchema = SchemaFactory.createForClass(Divice)