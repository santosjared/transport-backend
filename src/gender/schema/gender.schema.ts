import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

 
 export type genderDocument = HydratedDocument<Gender>

 @Schema()
 export class Gender {
    @Prop()
    name:string
 }