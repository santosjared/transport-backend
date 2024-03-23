import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'

export type RoadDocument = HydratedDocument<Road>

@Schema()
export class Road {
    @Prop({type:String, default:()=>uuidv4(), required:true})
    id:string
    @Prop({type:Object})
    geojsonR:any
    @Prop({type:Object})
    geojsonS:any
    @Prop()
    center:[]
    @Prop()
    zoom:number
    @Prop()
    name:string
    @Prop({type:Boolean, default:true})
    status:boolean
    @Prop({type:Date, default:Date.now})
    createdAt:Date
}
export const roadSchema = SchemaFactory.createForClass(Road)