import { Module } from '@nestjs/common';
import { RoadService } from './road.service';
import { RoadController } from './road.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Road } from './entities/road.entity';
import { RoadSchema } from './schema/road.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Road.name,
    schema:RoadSchema
  }])],
  controllers: [RoadController],
  providers: [RoadService]
})
export class RoadModule {}
