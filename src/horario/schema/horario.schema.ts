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
    horarioIda:Array<
    {
        place:string,
        firstOut:string
        lastOut:string
        days:[],
        description:string
    }
    >
    @Prop()
    horarioVuelta:Array<
    {
        place:string,
        firstOut:string
        lastOut:string
        days:[],
        description:string
    }
    >
    @Prop({type:Boolean, default:true})
    status:boolean
}

export const horarioSchema = SchemaFactory.createForClass(Horario)