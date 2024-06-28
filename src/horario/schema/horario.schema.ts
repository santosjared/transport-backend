import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4} from 'uuid'

export type HorarioDocument = HydratedDocument<Horario>

@Schema()
export class Horario{
    @Prop({type:String, default: ()=>uuidv4(), unique:true})
    id:string
    @Prop()
    name:string
    @Prop()
    place:string
    @Prop()
    firstOut:string
    @Prop()
    lastOut:string
    @Prop()
    frequency:number
    @Prop()
    time:string
    @Prop()
    days:string[]
    @Prop()
    description:string
    @Prop({type:Boolean, default:false})
    delete:boolean
}

export const HorarioSchema = SchemaFactory.createForClass(Horario)