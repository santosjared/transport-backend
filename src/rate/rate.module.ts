import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { TarifaController } from './rate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rate, rateSchema } from './schema/rate.schema';
import { TarifasModule } from 'src/tarifas/tarifas.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Rate.name,
    schema:rateSchema,
  }]),
  TarifasModule,
  UsersModule
],
  controllers: [TarifaController],
  providers: [RateService],
})
export class RateModule {}
