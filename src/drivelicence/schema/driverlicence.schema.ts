import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'
export type DriveLicenceDocument = HydratedDocument<drivelicence>

@Schema()
export class drivelicence {
    @Prop({type:String, default:()=>uuidv4(), unique:true})
    uuid:string
    @Prop({type:String, default:()=>uuidv4(), unique:true})
    user:string
    @Prop()
    numberLicence:string
    @Prop()
    emition:string
    @Prop()
    expiration:string
    @Prop()
    category:string
    @Prop()
    front:string
    @Prop()
    back:string
    @Prop({type:Boolean,default:true})
    status:boolean
}
export const driverlicenceSchema = SchemaFactory.createForClass(drivelicence)