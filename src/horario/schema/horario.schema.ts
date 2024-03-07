import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import messages from "src/utils/messages";
import { isTime } from "src/utils/valitadors";
import { v4 as uuidv4} from 'uuid'

export type HorarioDocument = HydratedDocument<Horario>

@Schema()
export class Horario{
    @Prop({type:String, default: ()=>uuidv4(), unique:true})
    uuid:string
    @Prop({unique:true})
    name:string
    @Prop({validate:{
        validator:isTime,
        message:messages.IsTime
    }})
    horarios:Array<{
        dias:Array<{dia:string,
            Horas:Array<{
                uuid:string
                hora:string
            }>
        }>
    }>
    
}