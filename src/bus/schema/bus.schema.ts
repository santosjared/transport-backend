import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Locations } from "src/locations/schema/locations.schema";
import { Users } from "src/users/schema/users.schema";
import {v4 as uuidv4} from 'uuid'

export type BusDocmunet = HydratedDocument<Bus>

@Schema()
export class Bus{
    @Prop({type:String, default: ()=>uuidv4(), required:true})
    id:string
    @Prop()
    trademark:string
    @Prop()
    model:number
    @Prop()
    type:string
    @Prop()
    plaque:string
    @Prop()
    cantidad:number
    @Prop()
    photo:string
    @Prop()
    ruat:string
    @Prop({type:String})
    status:string
    
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Users',default:null})
    userId:Users
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Locations', default:null}) 
    locationId:Locations
    @Prop({type:Boolean, default:false})
    delete:boolean
}
export const busSchema = SchemaFactory.createForClass(Bus)