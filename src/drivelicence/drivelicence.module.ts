import { Module } from '@nestjs/common';
import { DrivelicenceService } from './drivelicence.service';
import { DrivelicenceController } from './drivelicence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { drivelicence, driverlicenceSchema } from './schema/driverlicence.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {   
      name:drivelicence.name,
      schema:driverlicenceSchema
    }
  ])],
  controllers: [DrivelicenceController],
  providers: [DrivelicenceService]
})
export class DrivelicenceModule {}
