import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { BusMarker } from "src/busmarker/schema/busmarker.schema";
import { BusStatus } from "src/busstatus/schema/busstatus.schema";
import { BusType } from "src/bustype/schema/bustype.schema";
import { Locations } from "src/locations/schema/locations.schema";
import { Road } from "src/road/schema/road.schema";
import { Users } from "src/users/schema/users.schema";
import {v4 as uuidv4} from 'uuid'

export type BusDocmunet = HydratedDocument<Bus>

@Schema()
export class Bus{
    @Prop({type:String, default: ()=>uuidv4(), required:true})
    id:string
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'BusMarker'})
    trademark:BusMarker
    @Prop()
    model:number
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'BusType'})
    type:BusType
    @Prop()
    plaque:string
    @Prop()
    cantidad:number
    @Prop()
    photo:string
    @Prop()
    ruat:string
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'BusStatus'})
    status:BusStatus
    
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Users',default:null})
    userId:Users
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Locations', default:null}) 
    locationId:Locations
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Road', default:null})
    road:Road
    @Prop({type:Boolean, default:false})
    delete:boolean
}
export const busSchema = SchemaFactory.createForClass(Bus)