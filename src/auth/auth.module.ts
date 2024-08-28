import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, authSchema } from './schema/auth.schema';
import { JwtModule} from '@nestjs/jwt';
import getConfig from 'src/config/environment'
import { Users, UsersSchema } from 'src/users/schema/users.schema';
import { ConfigModule } from '@nestjs/config';
import environment from 'src/config/environment';
import { JwtStrategy } from './auth.stratigy';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true,
      load:[environment]
    }),
    MongooseModule.forFeature([{
    name:Auth.name,
    schema:authSchema
  }]),
  MongooseModule.forFeature([{
    name:Users.name,
    schema:UsersSchema,
  }]),
  JwtModule.register({
    global: true,
    secret:getConfig().token_Secret,
    signOptions:{expiresIn:getConfig().token_expire}
  })
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
