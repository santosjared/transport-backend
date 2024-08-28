import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, GenderSchema } from './schema/gender.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Gender.name,
    schema:GenderSchema
  }])],
  controllers: [GenderController],
  providers: [GenderService],
  exports:[GenderService]
})
export class GenderModule {}
