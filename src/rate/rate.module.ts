import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { TarifaController } from './rate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rate, rateSchema } from './schema/rate.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Rate.name,
    schema:rateSchema
  }])],
  controllers: [TarifaController],
  providers: [RateService],
})
export class RateModule {}
