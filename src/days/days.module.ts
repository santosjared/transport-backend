import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Days, DaysSchema } from './schema/days.shema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Days.name,
      schema:DaysSchema
    }
  ])],
  controllers: [DaysController],
  providers: [DaysService]
})
export class DaysModule {}
