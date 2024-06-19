import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import getConfig from './config/environment'
import { RolesService } from './roles/roles.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  const Rol = app.get(RolesService)
  Rol.Seeders()
  const config = new DocumentBuilder()
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
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document)
  await app.listen(getConfig().port);
}
bootstrap();
