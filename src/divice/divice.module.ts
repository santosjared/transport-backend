import { Module } from '@nestjs/common';
import { DiviceService } from './divice.service';
import { DiviceController } from './divice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Divice, DiviceSchema } from './schema/divice.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Divice.name,
    schema:DiviceSchema
  }])],
  controllers: [DiviceController],
  providers: [DiviceService],
})
export class DiviceModule {}
