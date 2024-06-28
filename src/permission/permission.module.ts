import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './schema/permission.schema';
import { PermissionController } from './permission.controller';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Permission.name,
    schema:PermissionSchema
  }])],
  controllers:[PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
