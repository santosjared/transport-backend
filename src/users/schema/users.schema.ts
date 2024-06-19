import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsEmail, IsString, isEmail, isString } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
import { Bus } from "src/bus/schema/bus.schema";
import { LicenceDriver } from "src/licence-driver/schema/licence-driver.schema";
import { Rol } from "src/roles/schema/roles.schema";
import {v4 as uuid} from 'uuid'

export type UsersDocument = HydratedDocument <Users>

@Schema()
export class Users {
    tostring(): mongoose.Condition<mongoose.Types.ObjectId> {
      throw new Error('Method not implemented.');
    }
    @Prop({type:String, default:()=>uuid()})
    id:string
    @IsString()
    @Prop({required:true,  message: 'El nombre es requerido' })
    name:string

    @IsString()
    @Prop({required:true})
    lastName:string

    @IsString()
    @Prop()
    gender:string

    @IsString()
    @Prop({required:true})
    ci:string

    @IsString()
    @Prop()
    phone:string

    @IsString()
    @Prop({required:true})
    address:string

    @IsString()
    @Prop({required:true})
    contry:string

    @IsString()
    @IsEmail()
    @Prop({unique:true, required:true})
    email:string

    @IsString()
    @Prop()
    profile:string

    @IsString()
    @Prop({type:String, default:'disconnected'})
    status:string

    @IsDate()
    @Prop({type:Date || null, default:null})
    lastConnect:Date | null
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Rol', default:null}]})
    rol:Rol[]
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'LicenceDriver', default:null})
    licenceId:LicenceDriver
    
    @Prop({type:Boolean, default:false})
    delete:boolean

}
export const UsersSchema = SchemaFactory.createForClass(Users)
