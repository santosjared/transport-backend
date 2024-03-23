import { Module } from '@nestjs/common';
import { DaysModule } from './days/days.module';
import { ConfigModule } from '@nestjs/config';
import environment from './config/environment';
import getConfig from './config/environment'
import { MongooseModule } from '@nestjs/mongoose';
import { HorarioModule } from './horario/horario.module';
import { DrivelicenceModule } from './drivelicence/drivelicence.module';
import { BusModule } from './bus/bus.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoadModule } from './road/road.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[environment]
  }),
  MongooseModule.forRoot(getConfig().mongodb),
  ServeStaticModule.forRoot({
    rootPath:join(__dirname,'..','uploads'),
    serveRoot: '/uploads'
  }),
  DaysModule,
  HorarioModule,
  DrivelicenceModule,
  BusModule,
  RoadModule
]
})
export class AppModule {}
