
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Components } from "src/componentes/schema/componentes";
import { Permission } from "src/permission/schema/permission.schema";
import { Users } from "src/users/schema/users.schema";
import {v4 as uuid} from 'uuid'

export type AccesRulesDocument = HydratedDocument<AccesRules>

@Schema()
export class AccesRules{

    @Prop({type:String, default:()=>uuid()})
    id:string
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Components',default:null})
    access:Components
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Permission',default:null}]})
    permission:Permission[]
    @Prop({type:Boolean, default:false})
    delete:boolean
}
export const AccesRulesSchema = SchemaFactory.createForClass(AccesRules)