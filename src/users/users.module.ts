import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Users.name,
    schema:UsersSchema
  }]), 
  MulterModule.register({
    dest:'./uploads'
  })
],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
