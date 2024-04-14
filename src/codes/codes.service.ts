import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Codes, CodesDocument } from './schema/codes.schema';
import { Model } from 'mongoose';

@Injectable()
export class CodesService {
  constructor(@InjectModel(Codes.name) private readonly codeModel: Model<CodesDocument>) { }
  async existsCode(createCodeDto: CreateCodeDto) {
    const { code } = createCodeDto;
    const codeDB = await this.codeModel.findOne({ code });
    if (!codeDB) { return false; }
    const time = new Date()
    if (time < codeDB.expire) { return true }
    return false;
  }
  async verifcate(code: string) {
    
    try {
      const number:number = parseInt(code)
      const codeDB = await this.codeModel.findOne({ code:number });
      if (!codeDB) { return false; }
      const time = new Date()
      if (time < codeDB.expire) { return true }
      return false;
    } catch {
      return false
    }
  }
  async find(expire: number) {
    const code = Math.floor(100000 + Math.random() * 900000);
    const date = new Date();
    date.setMinutes(date.getMinutes() + expire);
    if (!await this.codeModel.findOne({ code })) { return await this.codeModel.create({ code, expire: date }); }
    return await this.codeModel.updateOne({ code, expire: date })
  }
}
