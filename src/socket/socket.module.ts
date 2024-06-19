import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Auth, authSchema } from 'src/auth/schema/auth.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import getConfig from 'src/config/environment'
import { Users, UsersSchema } from 'src/users/schema/users.schema';
import { ConfigModule } from '@nestjs/config';
import environment from 'src/config/environment';
import { Locations, locactionsSchema } from '../locations/schema/locations.schema';
import { LocationsService } from '../locations/locations.service';
import { UsersService } from 'src/users/users.service';
import { Bus, busSchema } from 'src/bus/schema/bus.schema';
import { LineaService } from 'src/linea/linea.service';
import { Linea, LineaSchema } from 'src/linea/schema/linea.schema';
import { StatusService } from 'src/status/status.service';
import { Horario, HorarioSchema } from 'src/horario/schema/horario.schema';
import { Rate, rateSchema } from 'src/rate/schema/rate.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[environment]
    }),
    MongooseModule.forFeature([{
      name: Auth.name,
      schema: authSchema
    }]),
    MongooseModule.forFeature([{
      name: Users.name,
      schema: UsersSchema,
    }]),
    JwtModule.register({
      secret: getConfig().token_Secret,
      signOptions: { expiresIn: getConfig().token_expire }
    }),
    MongooseModule.forFeature([{
      name: Locations.name,
      schema: locactionsSchema
    }]),
    MongooseModule.forFeature([{
      name:Bus.name,
      schema:busSchema
    }]),
    MongooseModule.forFeature([{
      name:Linea.name,
      schema:LineaSchema
    }]),
    MongooseModule.forFeature([{
      name:Horario.name,
      schema:HorarioSchema
    }]),
    MongooseModule.forFeature([{
      name:Rate.name,
      schema:rateSchema
    }]),
    ScheduleModule.forRoot()
  ],
  providers: [SocketGateway, SocketService, AuthService,LocationsService,UsersService, LineaService,StatusService]

})
export class SocketModule { }
