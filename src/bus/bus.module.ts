import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bus } from './entities/bus.entity';
import { busSchema } from './schema/bus.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Bus.name,
    schema:busSchema
  }]),
  MulterModule.register({
    dest:'./uploads'
  })
],
  controllers: [BusController],
  providers: [BusService]
})
export class BusModule {}
