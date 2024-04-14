import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'

export type TarifaDocument = HydratedDocument<Tarifa>

@Schema()
export class Tarifa{
    @Prop({type:String, default:()=>uuidv4(), unique:true})
    id:string
    @Prop()
    tarifas:[]
    @Prop()
    name:string
    @Prop()
    description:string
    @Prop({type:Boolean, default:true})
    status:boolean
    @Prop({type:Date, default:Date.now})
    createdAt:Date
}

export const tarifaSchema = SchemaFactory.createForClass(Tarifa)