import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import getConfig from './config/environment'
import { RolesService } from './roles/roles.service';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './custom/custom.validation';
import { ComponentesService } from './componentes/componentes.service';
import { PermissionService } from './permission/permission.service';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  // const permission = app.get(PermissionService)
  // permission.Seeders()
  // const componentes = app.get(ComponentesService)
  // componentes.Seeders()
  // const Rol = app.get(RolesService)
  // Rol.Seeders()
  // componentes.asignedPermission()

  const user = app.get(UsersService)
  user.DefaultCreateUser()
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('autobuses')
  .setDescription('The api for autobuses')
  .setVersion('1.0')
  .addTag('auth')
  .addTag('bus')
  .addTag('horario')
  .addTag('licencia')
  .addTag('linea')
  .addTag('locations')
  .addTag('roles')
  .addTag('tarifa')
  .addTag('users')
  .addTag('permissions')
  .addTag('componentes')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document)
  await app.listen(getConfig().port,'0.0.0.0');
}
bootstrap();
