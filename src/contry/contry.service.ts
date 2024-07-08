import { Injectable } from '@nestjs/common';
import { CreateContryDto } from './dto/create-contry.dto';
import { UpdateContryDto } from './dto/update-contry.dto';

@Injectable()
export class ContryService {
  create(createContryDto: CreateContryDto) {
    return 'This action adds a new contry';
  }

  findAll() {
    return `This action returns all contry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contry`;
  }

  update(id: number, updateContryDto: UpdateContryDto) {
    return `This action updates a #${id} contry`;
  }

  remove(id: number) {
    return `This action removes a #${id} contry`;
  }
}
