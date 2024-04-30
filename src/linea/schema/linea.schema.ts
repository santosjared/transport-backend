import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'

export type LineaDocument = HydratedDocument<Linea>

@Schema()
export class Linea{
    @Prop({type:String, default:()=>uuidv4()})
    id:string
    @Prop()
    name:string
    @Prop()
    route:string
    @Prop()
    horario:[]
    @Prop()
    tarifa:[]
    @Prop()
    buses:[]
    @Prop({type:Boolean, default:true})
    status:boolean
    @Prop({type:Date, default:Date.now})
    createdAt:Date
}
export const LineaSchema = SchemaFactory.createForClass(Linea)