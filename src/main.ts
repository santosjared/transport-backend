import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import getConfig from './config/environment'
import { DaysService } from './days/days.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  const DaySeeder = app.get(DaysService)
  DaySeeder.Seeders()
  const config = new DocumentBuilder()
  .setTitle('autobuses')
  .setDescription('The api for autobuses')
  .setVersion('1.0')
  .addTag('days')
  .addTag('drivelicence')
  .addTag('bus')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document)
  await app.listen(getConfig().port);
}
bootstrap();
