import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Horario, HorarioDocument } from './schema/horario.schema';
import { Model } from 'mongoose';
import { FiltersDto } from 'src/utils/filters.dto';

@Injectable()
export class HorarioService {
  constructor(@InjectModel(Horario.name) private readonly horarioModel:Model<HorarioDocument>){}
  async create(createHorarioDto: CreateHorarioDto) {
    const errorMessages= await this.isValidData(createHorarioDto)
    if(!errorMessages){
      return await this.horarioModel.create(createHorarioDto);
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async findAll(filters: FiltersDto) {
    const { filter, skip, limit } = filters
    const regexPattern = new RegExp(filter, 'i');
    const columnsToSearch = ['name', 'place','firstOut','lastOut','days','otherDay'];

    const orConditions = columnsToSearch.map(column => ({
      [column]: { $regex: regexPattern }
    }));

    if (skip && limit) {
      const result = await this.horarioModel.find({$or:orConditions,delete:false}).skip(skip).limit(limit).exec();
      const total = await this.horarioModel.countDocuments({$or:orConditions,delete:false})
      return { result, total }
    }
    const result = await this.horarioModel.find({$or:orConditions,delete:false}).exec();
    const total = await this.horarioModel.countDocuments({$or:orConditions,delete:false})
    return { result, total }
  }

  findOne(id: string) {

    return this.horarioModel.findOne({id, delete:false});
  }

  async update(id: string, updateHorarioDto: UpdateHorarioDto) {
    const errorMessages= await this.isValidData(updateHorarioDto)
    if(!errorMessages){
      return await this.horarioModel.findOneAndUpdate({id},updateHorarioDto);
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const delet = await this.horarioModel.findOneAndUpdate({id},{delete:true},{new:true})
    if(delet){
      return delet
    }else{
      throw new NotFoundException('tarifa no encontrado');
    }
  }
  async isValidData(createHorarioDto: CreateHorarioDto | UpdateHorarioDto, update?:boolean){
    const message={
      name:'',
      place:'',
      firstOut:'',
      lastOut:'',
      days:'',
      otherDay:'',
      description:''
    }
    let isError = false
    if(!createHorarioDto.name){
      isError=true
      message.name='el campo Nombre de horario es requerido'
    }
    if(!createHorarioDto.place){
      isError = true
      message.place = 'el campo Lugar de salida es requerido'
    }
    if(!createHorarioDto.firstOut){
      isError = true
      message.firstOut = 'el campo hora primera salida es requerido'
    }
    if(!createHorarioDto.lastOut){
      isError = true
      message.firstOut = 'el campo hora última salida es requerido'
    }
    if(createHorarioDto.days.length === 0 && !createHorarioDto.otherDay){
      isError = true
      message.days = 'Seleccione o escriba al menos un día'
    }
    console.log(this.calcularDiferenciaHoras(createHorarioDto.firstOut,createHorarioDto.lastOut))
    if(this.calcularDiferenciaHoras(createHorarioDto.firstOut,createHorarioDto.lastOut)<1){
      isError = true
      message.lastOut = 'la diferencia de hora al menos debe ser a 1 hora'
    }
    if(isError){
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
