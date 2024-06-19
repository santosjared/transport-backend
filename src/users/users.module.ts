import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { MulterModule } from '@nestjs/platform-express';
import { AuthService } from 'src/auth/auth.service';
import { Auth, authSchema } from 'src/auth/schema/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { Bus, busSchema } from 'src/bus/schema/bus.schema';

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
  MulterModule.register({
    dest:'./uploads'
  })
],
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtService],
})
export class UsersModule {}
