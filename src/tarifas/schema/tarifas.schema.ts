import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'

export type TarifasDocmunent = HydratedDocument<Tarifas>

@Schema()
export class Tarifas{
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop({type:String})
    tipo:string
    @Prop({type:String})
    tarifa:string
}
export const TarifaSchema = SchemaFactory.createForClass(Tarifas)