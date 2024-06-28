import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Bus } from "src/bus/schema/bus.schema";
import { Horario } from "src/horario/schema/horario.schema";
import { Road } from "src/road/schema/road.schema";
import { Rate } from "src/rate/schema/rate.schema";
import {v4 as uuidv4} from 'uuid'
import { ReportLinea } from "src/reportlinea/schema/reportlinea.schema";

export type LineaDocument = HydratedDocument<Linea>

@Schema()
export class Linea{
    @Prop({type:String, default:()=>uuidv4()})
    id:string
    @Prop()
    name:string
    @Prop({type:Number, default:0})
    request:number
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Road'}]})
    road:Road[]
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Horario'}]})
    horario:Horario[]
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Rate'}]})
    rate:Rate[]
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Bus'}]})
    buses:Bus[]
    @Prop({type:Date, default:Date.now})
    createdAt:Date
    @Prop({type:Boolean , default:false})
    delete:boolean
}
export const LineaSchema = SchemaFactory.createForClass(Linea)