import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Linea } from "src/linea/schema/linea.schema";
import {v4 as uuid } from 'uuid'


export type ReportLineaDocument = HydratedDocument<ReportLinea>

@Schema()
export class ReportLinea{
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop({type:Number})
    cantidad:number
    @Prop({type:Boolean, default:false})
    delete:boolean
}
export const reportlineaSchema = SchemaFactory.createForClass(ReportLinea)