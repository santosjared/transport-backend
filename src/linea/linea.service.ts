import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Linea, LineaDocument } from './schema/linea.schema';
import { Model } from 'mongoose';
import { FiltersDto } from 'src/utils/filters.dto';
import { AsignedRoadDto } from './dto/asigned-road';
import { Horario, HorarioDocument} from 'src/horario/schema/horario.schema';
import { AsignedHorarioDto } from './dto/asigned-horario';
import { Rate, RateDocument } from 'src/rate/schema/rate.schema';
import { AsignedRateDto } from './dto/asigned-tarifa';
import { Bus, BusDocmunet } from 'src/bus/schema/bus.schema';
import { AsignedBusDto } from './dto/asigned-bus';

@Injectable()
export class LineaService {
  constructor(
    @InjectModel(Linea.name) private readonly lineModel:Model<LineaDocument>,
    @InjectModel(Horario.name) private readonly horarioModel:Model<HorarioDocument>,
    @InjectModel(Rate.name) private readonly tarifaModel:Model<RateDocument>,
    @InjectModel(Bus.name) private readonly busModel:Model<BusDocmunet> 
){}
  async create(createLineaDto: CreateLineaDto) {
    const errorMessages= await this.isValidData(createLineaDto)
    if(!errorMessages){
      return await this.lineModel.create(createLineaDto);
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async findAll(filters: FiltersDto) {
    const { filter, skip, limit } = filters;
    const regexPattern = new RegExp(filter, 'i');
    const columnsToSearch = ['name'];
  
    const orConditions = columnsToSearch.map(column => ({
      [column]: { $regex: regexPattern }
    }));
  
    const query = { delete: false };
  
    const populateOptions = [
      { path: 'road', match: { delete: false } },
      { path: 'horario', match: { delete: false } },
      { path: 'rate', match: { delete: false } },
      { 
        path: 'buses',
        match: { delete: false },
        populate: [
          { 
            path: 'userId', 
            model: 'Users', 
            match: { delete: false },
            populate: { 
              path: 'licenceId', 
              model: 'LicenceDriver',
              match: { delete: false }
            }
          },
          { 
            path: 'locationId', 
            model: 'Locations',
            match: { delete: false }
          }
        ]
      }
    ];
  
    let result;
    if (skip && limit) {
      result = await this.lineModel.find(query)
        .populate(populateOptions)
        .skip(skip)
        .limit(limit)
        .exec();
    } else {
      result = await this.lineModel.find(query)
        .populate(populateOptions)
        .exec();
    }
  
    const total = await this.lineModel.countDocuments({
      $or: orConditions,
      delete: false
    });
  
    return { result, total };
  }  
  async findOne(id: string) {
    const linea = await this.lineModel.findOne({id})
    const update = await this.lineModel.findOneAndUpdate({id},{request:linea.request+1})
    return await this.lineModel.findOne({id,delete:false}).populate('road').populate('horario')
    .populate('rate').populate({path:'buses',populate:[{path:'userId',model:'Users',populate:{path:'licenceId', model:'LicenceDriver'}},{path:'locationId',model:'Locations'}]});
  }
  async update(id: string, updateLineaDto: UpdateLineaDto) {
    const errorMessages= await this.isValidData(updateLineaDto)
    if(!errorMessages){
      return await this.lineModel.findOneAndUpdate({id},updateLineaDto);
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const delet = await this.lineModel.findOneAndUpdate({id},{delete:true},{new:true})
    if(delet){
      return delet
    }else{
      throw new NotFoundException('liena no encontrado');
    }
  }
  async findLinea (){
    return await this.lineModel.find({delete:false}).populate('road').populate('horario')
    .populate('rate')
    .populate({path:'buses',populate:[{path:'userId',model:'Users',
    populate:{path:'licenceId', model:'LicenceDriver'}},{path:'locationId',model:'Locations'}]})
  }
  async isValidData(createLineaDto: CreateLineaDto| UpdateLineaDto, update?:boolean){
    const message={
      name:''
    }
    let isError = false
    if(!createLineaDto.name){
      isError=true
      message.name='el campo Linea es requerido'
    }
    if(!update){
      const data = await this.lineModel.findOne({name:createLineaDto.name})
      if(data){
        isError = true
        message.name = `la linea ${data.name} ya se encuetra registrado`
      }
    }
    if(isError){
      return message
    }
    return null
  }
  async requests (){
    const result = await this.lineModel.find({delete:false}).sort({request:-1}).limit(10)
    const total = await this.lineModel.countDocuments({delete:false})
    return {result, total}
  }
  async desasignedRoad (id:string){
    const update = await this.lineModel.findOneAndUpdate({id, delete:false},{road:null}) 
    if(update){
      return update
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedRoad (id:string,asignedRoadDto:AsignedRoadDto){
    const update = await this.lineModel.findOneAndUpdate({id,delete:false},{road:asignedRoadDto.road})
    if(update){
      return update
    }
    throw new NotFoundException('linea no encontrado');
  }
  async desasignedHorario (id:string,desasignedHorario:AsignedHorarioDto){
    const update = await this.lineModel.findOneAndUpdate({id},{$pull:{horario:{$in:desasignedHorario.horario}}},{new:true})
    if(update){
      return update.populate([{ path: 'horario', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedHorario (id:string,asignedHorario:AsignedHorarioDto){
    const update = await this.lineModel.findOneAndUpdate({id},{$addToSet:{horario:{$each:asignedHorario.horario}}},{new:true})
    if(update){
      return update.populate([{ path: 'horario', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async allHorarioNotAsigned (id:string){
    const linea = await this.lineModel.findOne({id:id,delete:false})
    if(linea){
      if(linea.horario.length>0){
        const horarioIds = linea.horario.map((id)=>{
          return id.toString()
        })
        return await this.horarioModel.find({_id:{$nin:horarioIds}, delete:false})
      }
      return await this.horarioModel.find({delete:false})
    }
    throw new NotFoundException('linea no encontrado');
  }
  async allTarifaNotAsigned (id:string){
    const linea = await this.lineModel.findOne({id:id, delete:false})
    if(linea){
      if(linea.rate.length>0){
        const TarifaIds = linea.rate.map((id)=>{
          return id.toString()
        })
        return await this.tarifaModel.find({_id:{$nin:TarifaIds}, delete:false})
      }
      return await this.tarifaModel.find({delete:false})
    }
    throw new NotFoundException('linea no encontrado');
  }
  async desasignedTarifa (id:string,desasignedTarifa:AsignedRateDto){
    const update = await this.lineModel.findOneAndUpdate({id},{$pull:{rate:{$in:desasignedTarifa.rate}}},{new:true})
    if(update){
      return update.populate([{ path: 'rate', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedTarifa (id:string,asignedTarifa:AsignedRateDto){
    const update = await this.lineModel.findOneAndUpdate({id},{$addToSet:{rate:{$each:asignedTarifa.rate}}},{new:true})
    if(update){
      return update.populate([{ path: 'rate', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async allBusNotAsigned(filters){
    const busAssignedToLinea = await this.lineModel.find().distinct('buses').exec();
    if (busAssignedToLinea === null) {
      return [];
    }
    
    const busIdsAssignedToLinea = busAssignedToLinea
      .filter(buses => buses !== null)
      .map(buses => buses.toString()); 
      const { filter, skip, limit } = filters
      const regexPattern = new RegExp(filter, 'i');
      const columnsToSearch = ['name', 'plaque'];
  
      const orConditions = columnsToSearch.map(column => ({
        [column]: { $regex: regexPattern }
      }));
      if (skip && limit) {
        const result = await this.busModel.find({ 
          $and: [
              { _id: { $nin: busIdsAssignedToLinea } },
              { $or: orConditions },
              { delete: false }
          ]
      }).skip(skip).limit(limit).exec();
        const total = await this.busModel.countDocuments({ 
          $and: [
              { _id: { $nin: busIdsAssignedToLinea } },
              { $or: orConditions },
              { delete: false }
          ]
      })
        return { result, total }
      }
      const result = await this.busModel.find({ 
        $and: [
            { _id: { $nin: busIdsAssignedToLinea } },
            { $or: orConditions },
            { delete: false }
        ]
    }).exec();
      const total = await this.busModel.countDocuments({ 
        $and: [
            { _id: { $nin: busIdsAssignedToLinea } },
            { $or: orConditions },
            { delete: false }
        ]
    })
      return { result, total }
  }
  async desasignedBus (id:string,desasignedBus:AsignedBusDto){
    const update = await this.lineModel.findOneAndUpdate({id},{$pull:{buses:{$in:desasignedBus.buses}}},{new:true})
    if(update){
      return update.populate([{ path: 'buses', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedBus (id:string,asignedBus:AsignedBusDto){
    const update = await this.lineModel.findOneAndUpdate({id},{$addToSet:{buses:{$each:asignedBus.buses}}},{new:true})
    if(update){
      return update.populate([{ path: 'buses', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
}