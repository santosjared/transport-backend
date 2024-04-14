import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Codes, codesSchema } from './schema/codes.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Codes.name,
    schema:codesSchema
  }])],
  controllers: [CodesController],
  providers: [CodesService],
})
export class CodesModule {}
