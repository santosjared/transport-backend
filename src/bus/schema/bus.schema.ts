import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'

export type BusDocmunet = HydratedDocument<Bus>

@Schema()
export class Bus{
    @Prop({type:String, default: ()=>uuidv4(), required:true})
    id:string
    @Prop()
    trademark:string
    @Prop()
    model:string
    @Prop()
    type:string
    @Prop()
    plaque:string
    @Prop()
    cantidad:number
    @Prop()
    idUser:string
    @Prop()
    photo:string 
    @Prop({type:Boolean, default:true})
    status:boolean
}
export const busSchema = SchemaFactory.createForClass(Bus)