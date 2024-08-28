import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { MulterModule } from '@nestjs/platform-express';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Bus, busSchema } from 'src/bus/schema/bus.schema';
import { Auth, authSchema } from 'src/auth/schema/auth.schema';
import { Permission, PermissionSchema } from 'src/permission/schema/permission.schema';
import { Components, ComponentsSchma } from 'src/componentes/schema/componentes';
import { Rol, rolSchema } from 'src/roles/schema/roles.schema';
import { GenderModule } from 'src/gender/gender.module';
import { ContryModule } from 'src/contry/contry.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Users.name,
    schema:UsersSchema
  }]),
  MongooseModule.forFeature([{
    name:Auth.name,
    schema:authSchema
  }]), 
  MongooseModule.forFeature([{
    name:Bus.name,
    schema:busSchema
  }]),
  MongooseModule.forFeature([{
    name:Permission.name,
    schema:PermissionSchema
  }]),
  MongooseModule.forFeature([{
    name:Components.name,
    schema:ComponentsSchma
  }]),
  MongooseModule.forFeature([{
    name:Rol.name,
    schema:rolSchema
  }]),
  GenderModule,
  ContryModule,
  MulterModule.register({
    dest:'./uploads'
  })
],
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtService],
  exports:[UsersService]
})
export class UsersModule {}
