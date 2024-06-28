import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Horario, HorarioDocument } from './schema/horario.schema';
import { Model } from 'mongoose';
import { FiltersDto } from 'src/utils/filters.dto';

@Injectable()
export class HorarioService {
  constructor(@InjectModel(Horario.name) private readonly horarioModel: Model<HorarioDocument>) { }
  async create(createHorarioDto: CreateHorarioDto) {
    const errorMessages = await this.isValidData(createHorarioDto)
    if (!errorMessages) {
      return await this.horarioModel.create(createHorarioDto);
    }
    throw new HttpException({ message: errorMessages }, HttpStatus.BAD_REQUEST);
  }

  async findAll(filters: any) {
    if (filters) {
      const { filter, skip, limit } = filters;
      const searchFilters = { delete: false };
      if (filter) {
        if (filter.name) {
          searchFilters['name'] = { $regex: new RegExp(filter.name, 'i') };
        }
        if (filter.place) {
          searchFilters['place'] = { $regex: new RegExp(filter.place, 'i') };
        }
        if (filter.firstOut) {
          searchFilters['firstOut'] = { $regex: new RegExp(filter.firstOut, 'i') };
        }
        if (filter.lastOut) {
          searchFilters['lastOut'] = { $regex: new RegExp(filter.lastOut, 'i') };
        }
        if (filter.days) {
          searchFilters['days'] = { $regex: new RegExp(filter.days, 'i') };
        }
      }
      if (skip !== undefined && limit !== undefined) {
        const result = await this.horarioModel.find(searchFilters).skip(skip).limit(limit).exec();
        const total = await this.horarioModel.countDocuments(searchFilters);
        return { result, total };
      }

      const result = await this.horarioModel.find(searchFilters);
      const total = await this.horarioModel.countDocuments(searchFilters);
      return { result, total };
    }
    const result = await this.horarioModel.find({ delete: false });
    const total = await this.horarioModel.countDocuments({ delete: false });
    return { result, total };
  }

  findOne(id: string) {

    return this.horarioModel.findOne({ id, delete: false });
  }

  async update(id: string, updateHorarioDto: UpdateHorarioDto) {
    const errorMessages = await this.isValidData(updateHorarioDto, true, id)
    if (!errorMessages) {
      return await this.horarioModel.findOneAndUpdate({ id }, updateHorarioDto);
    }
    throw new HttpException({ message: errorMessages }, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const delet = await this.horarioModel.findOneAndUpdate({ id }, { delete: true }, { new: true })
    if (delet) {
      return delet
    } else {
      throw new NotFoundException('tarifa no encontrado');
    }
  }
  async isValidData(createHorarioDto: CreateHorarioDto | UpdateHorarioDto, update?: boolean, id?: string) {
    const message = {
      name: '',
      place: '',
      firstOut: '',
      lastOut: '',
      frequency: '',
      time: '',
      days: '',
      otherDay: '',
      description: ''
    }
    let isError = false
    if (this.calcularDiferenciaHoras(createHorarioDto.firstOut, createHorarioDto.lastOut) < 1) {
      isError = true
      message.lastOut = 'la diferencia de hora al menos debe ser a 1 hora en el rango de 00:00 23:59'
    }
    if (this.calcularDiferenciaHoras(createHorarioDto.firstOut, createHorarioDto.lastOut) > 24) {
      isError = true
      message.lastOut = 'La diferencia de hora debe ser en el rango de 00:00 a 23:59'
    }
    if(createHorarioDto.frequency && createHorarioDto.frequency >24 && createHorarioDto.time === 'hrs'){
      isError = true
      message.frequency = 'la hora debe ser no mayor a 24 horas, seleccione en dias'
    }
    if(createHorarioDto.frequency && createHorarioDto.frequency >59 && createHorarioDto.time === 'min'){
      isError = true
      message.frequency = 'los minutos debe ser no mayor a 59, seleccione en horas'
    }
    if (createHorarioDto.name && !update) {
      const rate = await this.horarioModel.findOne({ name: createHorarioDto.name })
      if (rate) {
        isError = true
        message.name = 'El nombre de tarifa ya se encuentra registrado'
      }
    }
    if (createHorarioDto.name && update) {
      const rate = await this.horarioModel.findOne({ name: createHorarioDto.name, id: { $ne: id } })
      if (rate) {
        isError = true
        message.name = 'El nombre de tarifa ya se encuentra registrado'
      }
    }
    if (isError) {
      return message
    }
    return null
  }
  calcularDiferenciaHoras(horaInicio: string, horaFin: string): number {
    const horaInicioMillis = this.parsearHoraAMilisegundos(horaInicio);
    const horaFinMillis = this.parsearHoraAMilisegundos(horaFin);

    // Si la hora de fin es menor que la hora de inicio, sumar 24 horas (en milisegundos)
    let diferenciaMilisegundos = horaFinMillis - horaInicioMillis;
    if (diferenciaMilisegundos < 0) {
      diferenciaMilisegundos += 24 * 60 * 60 * 1000; // Añadir 24 horas en milisegundos
    }

    const diferenciaHoras = diferenciaMilisegundos / (1000 * 60 * 60);
    return diferenciaHoras;
  }

  private parsearHoraAMilisegundos(hora: string): number {
    const [horas, minutos] = hora.split(':').map(Number);
    return (horas * 60 + minutos) * 60 * 1000;
  }
}
