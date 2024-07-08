import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import environment from './config/environment';
import getConfig from './config/environment'
import { MongooseModule } from '@nestjs/mongoose';
import { HorarioModule } from './horario/horario.module';
import { BusModule } from './bus/bus.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoadModule } from './road/road.module';
import { SocketModule } from './socket/socket.module';
import { RateModule } from './rate/rate.module';
import { LineaModule } from './linea/linea.module';
import { UsersModule } from './users/users.module';
import { LicenceDriverModule } from './licence-driver/licence-driver.module';
import { AuthModule } from './auth/auth.module';
import { LocationsModule } from './locations/locations.module';
import { RolesModule } from './roles/roles.module';
import { ReportlineaModule } from './reportlinea/reportlinea.module';
import { ComponentesModule } from './componentes/componentes.module';
import { PermissionModule } from './permission/permission.module';
import { GenderModule } from './gender/gender.module';
import { ContryModule } from './contry/contry.module';

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
  HorarioModule,
  BusModule,
  RoadModule,
  SocketModule,
  RateModule,
  LineaModule,
  UsersModule,
  LicenceDriverModule,
  AuthModule,
  LocationsModule,
  RolesModule,
  ReportlineaModule,
  ComponentesModule,
  PermissionModule,
  GenderModule,
  ContryModule,
]
})
export class AppModule {}
