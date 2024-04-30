import { Module } from '@nestjs/common';
import { ChoferesService } from './choferes.service';
import { ChoferesController } from './choferes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Choferes, choferesSchema } from './schema/choferes.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Choferes.name,
    schema:choferesSchema
  }]),
  MulterModule.register({
    dest:'./uploads'
  })
],
  controllers: [ChoferesController],
  providers: [ChoferesService],
})
export class ChoferesModule {}
