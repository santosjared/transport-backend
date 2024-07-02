// roles.module.ts
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService} from '@nestjs/jwt';
import { Rol, rolSchema } from './schema/roles.schema';
import { Components, ComponentsSchma } from 'src/componentes/schema/componentes';
import { Permission, PermissionSchema } from 'src/permission/schema/permission.schema';
import { RolesGuard } from '../roles/guards/rols.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rol.name, schema: rolSchema }]),
    MongooseModule.forFeature([{ name: Components.name, schema: ComponentsSchma }]),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService
  ],
  exports: [RolesService],  // Exporta RolesService
})
export class RolesModule {}
