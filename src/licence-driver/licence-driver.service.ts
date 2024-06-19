import { Injectable } from '@nestjs/common';
import { CreateLicenceDriverDto } from './dto/create-licence-driver.dto';
import { UpdateLicenceDriverDto } from './dto/update-licene-driver.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LicenceDriver, LicenceDriverDocument } from './schema/licence-driver.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';

@Injectable()
export class LicenceDriverService {
  constructor(@InjectModel(LicenceDriver.name) private readonly licenceDriverModel:Model<LicenceDriverDocument>){}
  async create(createLicenceDriverDto: CreateLicenceDriverDto, files: { licenceFront?: Express.Multer.File[], licenceBack?: Express.Multer.File[] }) {
    
    if(files){
      const { licenceFront, licenceBack } = files;

      if (licenceFront && licenceFront.length > 0) {
        const frontImage = licenceFront[0];
        const frontImagePath = `./uploads/${frontImage.originalname}`;
        await fs.promises.rename(frontImage.path, frontImagePath);
        createLicenceDriverDto.licenceFront = `/uploads/${frontImage.originalname}`;
      }
  
      if (licenceBack && licenceBack.length > 0) {
        const backImage = licenceBack[0];
        const backImagePath = `./uploads/${backImage.originalname}`;
        await fs.promises.rename(backImage.path, backImagePath);
        createLicenceDriverDto.licenceBack = `/uploads/${backImage.originalname}`;
      }
    }

    return await this.licenceDriverModel.create(createLicenceDriverDto);
  }

  async findAll() {
    return await this.licenceDriverModel.find({delete:false});
  }

  async findOne(id: string) {
    console.log(id)
    const res = await this.licenceDriverModel.findOne({id, delete:false});
    if(res){
      return res
    }
    return await this.licenceDriverModel.findOne({_id:id, delete:false});
  }
  async update(id: string, updateLicenceDriverDto: UpdateLicenceDriverDto, files: { licenceFront?: Express.Multer.File[], licenceBack?: Express.Multer.File[]}) {
    const licence = await this.licenceDriverModel.findOne({id})
    if(files){
      const { licenceFront, licenceBack } = files;

      if (licenceFront && licenceFront.length > 0) {
        const frontImage = licenceFront[0];
        const frontImagePath = `./uploads/${frontImage.originalname}`;
        await fs.promises.rename(frontImage.path, frontImagePath);
        updateLicenceDriverDto.licenceFront = `/uploads/${frontImage.originalname}`;
      }
  
      if (licenceBack && licenceBack.length > 0) {
        const backImage = licenceBack[0];
        const backImagePath = `./uploads/${backImage.originalname}`;
        await fs.promises.rename(backImage.path, backImagePath);
        updateLicenceDriverDto.licenceBack = `/uploads/${backImage.originalname}`;
      }
    }

    return await this.licenceDriverModel.findOneAndUpdate({id},updateLicenceDriverDto);
  }

  remove(id: number) {
    return `This action removes a #${id} chofere`;
  }
  async findIdUser(idUser:string){
    return await this.licenceDriverModel.findOne({userId:idUser})
  }
}
