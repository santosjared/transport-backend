import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'
import { Users} from "src/users/schema/users.schema";

export type LicenceDriverDocument = HydratedDocument<LicenceDriver>

@Schema()
export class LicenceDriver {
    @Prop({type:String, default:()=>uuid()})
    id:string
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
    @Prop({type:Boolean, default:false})
    delete:boolean
}
export const licenceDriverSchema = SchemaFactory.createForClass(LicenceDriver)
