import { Module } from '@nestjs/common';
import { LicenceDriverService } from './licence-driver.service';
import { LicenceDriverController } from './licence-driver.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LicenceDriver, licenceDriverSchema } from './schema/licence-driver.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MongooseModule.forFeature([{
    name:LicenceDriver.name,
    schema:licenceDriverSchema
  }]),
  MulterModule.register({
    dest:'./uploads'
  })
],
  controllers: [LicenceDriverController],
  providers: [LicenceDriverService],
})
export class LicenceDriverModule {}
