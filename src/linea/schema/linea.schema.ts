import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LineaDocument = HydratedDocument<Linea>

@Schema()
export class Linea{
    @Prop()
    name:string
    @Prop()
    route:string
    @Prop()
    horario:string
    @Prop()
    tarifa:string
    @Prop()
    buses:[]
}
export const LineaSchema = SchemaFactory.createForClass(Linea)