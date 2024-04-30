import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'

export type ChoferesDocument = HydratedDocument<Choferes>

@Schema()
export class Choferes {
    
    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop()
    userId:string
    @Prop()
    category:String
    @Prop()
    dateEmition:Date
    @Prop()
    dateExpire:Date
    @Prop()
    licenceFront:string
    @Prop()
    licenceBack:string
    @Prop({type:Boolean, default:true})
    status:boolean
}
export const choferesSchema = SchemaFactory.createForClass(Choferes)