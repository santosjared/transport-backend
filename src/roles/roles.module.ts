import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, rolSchema } from './schema/roles.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Rol.name,
    schema:rolSchema
  }])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
