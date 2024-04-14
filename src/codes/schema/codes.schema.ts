import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CodesDocument = HydratedDocument<Codes>

@Schema()
export class Codes{
    @Prop()
    code:number
    @Prop()
    expire:Date
}
export const codesSchema = SchemaFactory.createForClass(Codes)