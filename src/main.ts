import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import getConfig from './config/environment'
import { UsersService } from './users/users.service';
import { GenderService } from './gender/gender.service';
import { ContryService } from './contry/contry.service';
import { BusmarkerService } from './busmarker/busmarker.service';
import { BustypeService } from './bustype/bustype.service';
import { BusstatusService } from './busstatus/busstatus.service';
import { DaysService } from './days/days.service';
import { TarifasService } from './tarifas/tarifas.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const user = app.get(UsersService)
  const gender = app.get(GenderService)
  const contry = app.get(ContryService)
  const busMarker = app.get(BusmarkerService)
  const busType = app.get(BustypeService)
  const busStatus = app.get(BusstatusService)
  const Days = app.get(DaysService)
  const Tarifa = app.get(TarifasService)
  gender.defaultGender()
  contry.defaultContry()
  busMarker.defaultBusMaker();
  busType.defaultBusType();
  busStatus.defaultBusStatus();
  Days.defaultDays()
  Tarifa.defaulTarifas()
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
