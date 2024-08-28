import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuid} from 'uuid'

 
 export type genderDocument = HydratedDocument<Gender>

 @Schema()
 export class Gender {

   @Prop({type:String, default:()=>uuid()})
   id:string
    @Prop()
    name:string
 }

 export const GenderSchema = SchemaFactory.createForClass(Gender)