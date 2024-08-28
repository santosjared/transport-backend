import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Days } from "src/days/schema/days.schema";
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
    arrive:string
    @Prop()
    firstOut:string
    @Prop()
    lastOut:string
    @Prop()
    frequency:number
    @Prop()
    time:string
    @Prop({type:[{type:mongoose.SchemaTypes.ObjectId, ref:'Days'}]})
    days:Days[]
    @Prop()
    description:string
    @Prop({type:Boolean, default:false})
    delete:boolean
}

export const HorarioSchema = SchemaFactory.createForClass(Horario)