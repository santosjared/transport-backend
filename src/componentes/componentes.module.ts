import { Module } from '@nestjs/common';
import { ComponentesService } from './componentes.service';
import { ComponentesController } from './componentes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Components, ComponentsSchma } from './schema/componentes';
import { Permission, PermissionSchema } from 'src/permission/schema/permission.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Components.name,
    schema:ComponentsSchma
  }]),
  MongooseModule.forFeature([{
    name:Permission.name,
    schema:PermissionSchema
  }])
],
  controllers: [ComponentesController],
  providers: [ComponentesService],
})
export class ComponentesModule {}
