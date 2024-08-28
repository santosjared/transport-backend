import { Module } from '@nestjs/common';
import { BustypeService } from './bustype.service';
import { BustypeController } from './bustype.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusType, BusTypeSchema } from './schema/bustype.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:BusType.name,
    schema:BusTypeSchema
  }])],
  controllers: [BustypeController],
  providers: [BustypeService],
  exports:[BustypeService]
})
export class BustypeModule {}
