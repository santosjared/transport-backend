import { Module } from '@nestjs/common';
import { ContryService } from './contry.service';
import { ContryController } from './contry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contry, ContrySchema } from './schema/contry.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Contry.name,
    schema:ContrySchema
  }])],
  controllers: [ContryController],
  providers: [ContryService],
  exports:[ContryService]
})
export class ContryModule {}
