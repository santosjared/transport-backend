// roles.module.ts
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, rolSchema } from './schema/roles.schema';
import { Components, ComponentsSchma } from 'src/componentes/schema/componentes';
import { Permission, PermissionSchema } from 'src/permission/schema/permission.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rol.name, schema: rolSchema }]),
    MongooseModule.forFeature([{ name: Components.name, schema: ComponentsSchma }]),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
    UsersModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],  // Exporta RolesService
})
export class RolesModule {}
