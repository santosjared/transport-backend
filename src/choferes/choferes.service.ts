import { Injectable } from '@nestjs/common';
import { CreateChofereDto } from './dto/create-chofere.dto';
import { UpdateChofereDto } from './dto/update-chofere.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Choferes, ChoferesDocument } from './schema/choferes.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';

@Injectable()
export class ChoferesService {
  constructor(@InjectModel(Choferes.name) private readonly choferesModel:Model<ChoferesDocument>){}
  async create(createChofereDto: CreateChofereDto, files: { licenceFront?: Express.Multer.File[], licenceBack?: Express.Multer.File[] }) {
    const { licenceFront, licenceBack } = files;

    if (licenceFront && licenceFront.length > 0) {
      const frontImage = licenceFront[0];
      const frontImagePath = `./uploads/${frontImage.originalname}`;
      await fs.promises.rename(frontImage.path, frontImagePath);
      createChofereDto.licenceFront = `/uploads/${frontImage.originalname}`;
    }

    if (licenceBack && licenceBack.length > 0) {
      const backImage = licenceBack[0];
      const backImagePath = `./uploads/${backImage.originalname}`;
      await fs.promises.rename(backImage.path, backImagePath);
      createChofereDto.licenceBack = `/uploads/${backImage.originalname}`;
    }

    return await this.choferesModel.create(createChofereDto);
  }

  async findAll() {
    return await this.choferesModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} chofere`;
  }

  update(id: number, updateChofereDto: UpdateChofereDto) {
    return `This action updates a #${id} chofere`;
  }

  remove(id: number) {
    return `This action removes a #${id} chofere`;
  }
}
