import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bus } from './entities/bus.entity';
import { busSchema } from './schema/bus.schema';
import { MulterModule } from '@nestjs/platform-express';
import { Users, UsersSchema } from 'src/users/schema/users.schema';
import { BusmarkerModule } from 'src/busmarker/busmarker.module';
import { BustypeModule } from 'src/bustype/bustype.module';
import { BusstatusModule } from 'src/busstatus/busstatus.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Bus.name,
    schema:busSchema
  }]),
  BusmarkerModule,
  BustypeModule,
  BusstatusModule,
  UsersModule,
  MongooseModule.forFeature([{
    name:Users.name,
    schema:UsersSchema
  }]),
  MulterModule.register({
    dest:'./uploads'
  })
],
  controllers: [BusController],
  providers: [BusService]
})
export class BusModule {}
