import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Linea, LineaDocument } from './schema/linea.schema';
import { Model } from 'mongoose';
import { FiltersDto } from 'src/utils/filters.dto';
import { AsignedRoadDto } from './dto/asigned-road';
import { Horario, HorarioDocument } from 'src/horario/schema/horario.schema';
import { AsignedHorarioDto } from './dto/asigned-horario';
import { Rate, RateDocument } from 'src/rate/schema/rate.schema';
import { AsignedRateDto } from './dto/asigned-tarifa';
import { Bus, BusDocmunet } from 'src/bus/schema/bus.schema';
import { AsignedBusDto } from './dto/asigned-bus';
import { Road, RoadDocument } from 'src/road/schema/road.schema';
import { AsignedBusRoadDto } from './dto/asignedbusroad.dto';

@Injectable()
export class LineaService {
  constructor(
    @InjectModel(Linea.name) private readonly lineModel: Model<LineaDocument>,
    @InjectModel(Horario.name) private readonly horarioModel: Model<HorarioDocument>,
    @InjectModel(Rate.name) private readonly tarifaModel: Model<RateDocument>,
    @InjectModel(Bus.name) private readonly busModel: Model<BusDocmunet>,
    @InjectModel(Road.name) private readonly roadModel: Model<RoadDocument>
  ) { }
  async create(createLineaDto: CreateLineaDto) {
    const errorMessages = await this.isValidData(createLineaDto)
    if (!errorMessages) {
      return await this.lineModel.create(createLineaDto);
    }
    throw new HttpException({ message: errorMessages }, HttpStatus.BAD_REQUEST);
  }

  async findAll(filters: any) {
    const { filter, skip, limit } = filters;
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
  
    const searchFilters: any = { delete: false };
  
    if (filter) {
      if (filter.name) {
        searchFilters['name'] = { $regex: new RegExp(filter.name, 'i') };
      }
  
      if (filter.road) {
        const regexPattern = new RegExp(filter.road, 'i');
        const roadIds = await this.roadModel.find({ name: { $regex: regexPattern }, delete: false }).distinct('_id').exec();
        
        if (roadIds.length > 0) {
          searchFilters['road'] = { $in: roadIds };
        } else {
          return { result: [], total: 0 };
        }
      }
      if (filter.horario) {
        const regexPattern = new RegExp(filter.horario, 'i');
        const horarioIds = await this.horarioModel.find({ name: { $regex: regexPattern }, delete: false }).distinct('_id').exec();
        
        if (horarioIds.length > 0) {
          searchFilters['horario'] = { $in: horarioIds };
        } else {
          return { result: [], total: 0 };
        }
      }
      if (filter.rate) {
        const regexPattern = new RegExp(filter.rate, 'i');
        const tarifaIds = await this.tarifaModel.find({ name: { $regex: regexPattern }, delete: false }).distinct('_id').exec();
        
        if (tarifaIds.length > 0) {
          searchFilters['rate'] = { $in: tarifaIds };
        } else {
          return { result: [], total: 0 };
        }
      }
      if (filter.buses) {
        const regexPattern = new RegExp(filter.buses, 'i');
        const busConditions:any = {
          $or: [
            { trademark: { $regex: regexPattern } },
            { type: { $regex: regexPattern } },
            { plaque: { $regex: regexPattern } },
            { status: { $regex: regexPattern } }
          ], 
          delete:false
        };
          const filterNumber = parseFloat(filter.buses);
          const isFilterNumber = !isNaN(filterNumber);
          if (isFilterNumber) {
            busConditions.$or.push({model:{$eq:filterNumber}})
            busConditions.$or.push({cantidad:{$eq:filterNumber}})
          }
        const busIds = await this.busModel.find(busConditions).distinct('_id').exec();
        if (busIds.length > 0) {
          searchFilters['buses'] = { $in: busIds };
        } else {
          return { result: [], total: 0 };
        }
      }
    }
  
    let result;
    if (skip && limit) {
      result = await this.lineModel.find(searchFilters)
        .populate(populateOptions)
        .skip(skip)
        .limit(limit)
        .exec();
    } else {
      result = await this.lineModel.find(searchFilters)
        .populate(populateOptions)
        .exec();
    }
  
    const total = await this.lineModel.countDocuments(searchFilters).exec();
  
    return { result, total };
  }
  
  async findOneLinea(id: string) {
    const query = { id: id, delete: false };

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
    return await this.lineModel.findOne(query)
      .populate(populateOptions)
      .exec();
  }
  async findOne(id: string) {
    const linea = await this.lineModel.findOne({ id })
    return await this.lineModel.findOneAndUpdate({ id }, { request: linea.request + 1 })
  }
  async update(id: string, updateLineaDto: UpdateLineaDto) {
    const errorMessages = await this.isValidData(updateLineaDto, true, id)
    if (!errorMessages) {
      return await this.lineModel.findOneAndUpdate({ id }, updateLineaDto);
    }
    throw new HttpException({ message: errorMessages }, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const delet = await this.lineModel.findOneAndUpdate({ id }, { delete: true }, { new: true })
    if (delet) {
      return delet
    } else {
      throw new NotFoundException('liena no encontrado');
    }
  }
  async findLinea() {
    return await this.lineModel.find({ delete: false }).populate('road').populate('horario')
      .populate('rate')
      .populate({
        path: 'buses', populate: [{
          path: 'userId', model: 'Users',
          populate: { path: 'licenceId', model: 'LicenceDriver' }
        }, { path: 'locationId', model: 'Locations' }]
      })
  }
  async isValidData(createLineaDto: CreateLineaDto | UpdateLineaDto, update?: boolean, id?: string) {
    const message = {
      name: ''
    }
    let isError = false
    if (createLineaDto.name && !update) {
      const rate = await this.lineModel.findOne({ name: createLineaDto.name })
      if (rate) {
        isError = true
        message.name = 'El nombre de la linea ya se encuentra registrado'
      }
    }
    if (createLineaDto.name && update) {
      const rate = await this.lineModel.findOne({ name: createLineaDto.name, id: { $ne: id } })
      if (rate) {
        isError = true
        message.name = 'El nombre de la ya se encuentra registrado'
      }

    }
    if (isError) {
      return message
    }
    return null
  }
  async requests() {
    const result = await this.lineModel.find({ delete: false }).sort({ request: -1 }).limit(10)
    const total = await this.lineModel.countDocuments({ delete: false })
    return { result, total }
  }
  async desasignedRoad(id: string, desasignedRoad: AsignedRoadDto) {
    const update = await this.lineModel.findOneAndUpdate({ id }, { $pull: { road: { $in: desasignedRoad.road } } }, { new: true })
    if (update) {
      return update.populate([{ path: 'road', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedRoad(id: string, asignedRoadDto: AsignedRoadDto) {
    const update = await this.lineModel.findOneAndUpdate({ id }, { $addToSet: { road: { $each: asignedRoadDto.road } } }, { new: true })
    if (update) {
      return update.populate([{ path: 'road', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async desasignedHorario(id: string, desasignedHorario: AsignedHorarioDto) {
    const update = await this.lineModel.findOneAndUpdate({ id }, { $pull: { horario: { $in: desasignedHorario.horario } } }, { new: true })
    if (update) {
      return update.populate([{ path: 'horario', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedHorario(id: string, asignedHorario: AsignedHorarioDto) {
    const update = await this.lineModel.findOneAndUpdate({ id }, { $addToSet: { horario: { $each: asignedHorario.horario } } }, { new: true })
    if (update) {
      return update.populate([{ path: 'horario', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async allHorarioNotAsigned(id: string) {
    const linea = await this.lineModel.findOne({ id: id, delete: false })
    if (linea) {
      if (linea.horario.length > 0) {
        const horarioIds = linea.horario.map((id) => {
          return id.toString()
        })
        return await this.horarioModel.find({ _id: { $nin: horarioIds }, delete: false })
      }
      return await this.horarioModel.find({ delete: false })
    }
    throw new NotFoundException('linea no encontrado');
  }
  async allTarifaNotAsigned(id: string) {
    const linea = await this.lineModel.findOne({ id: id, delete: false })
    if (linea) {
      if (linea.rate.length > 0) {
        const TarifaIds = linea.rate.map((id) => {
          return id.toString()
        })
        return await this.tarifaModel.find({ _id: { $nin: TarifaIds }, delete: false })
      }
      return await this.tarifaModel.find({ delete: false })
    }
    throw new NotFoundException('linea no encontrado');
  }
  async desasignedTarifa(id: string, desasignedTarifa: AsignedRateDto) {
    const update = await this.lineModel.findOneAndUpdate({ id }, { $pull: { rate: { $in: desasignedTarifa.rate } } }, { new: true })
    if (update) {
      return update.populate([{ path: 'rate', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedTarifa(id: string, asignedTarifa: AsignedRateDto) {
    const update = await this.lineModel.findOneAndUpdate({ id }, { $addToSet: { rate: { $each: asignedTarifa.rate } } }, { new: true })
    if (update) {
      return update.populate([{ path: 'rate', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async allBusNotAsigned(filters) {
    // Retrieve the list of buses already assigned to a line
    const busAssignedToLinea = await this.lineModel.find().distinct('buses').exec();
    const busIdsAssignedToLinea = busAssignedToLinea
      ? busAssignedToLinea.filter(buses => buses !== null).map(buses => buses.toString())
      : [];

    // Extract filter parameters
    const { filter, skip, limit } = filters;
    const searchFilters = { delete: false };

    // Add filters based on the input
    if (filter?.trademark) {
      searchFilters['trademark'] = { $regex: new RegExp(filter.trademark, 'i') };
    }
    if (filter?.model) {
      const filterNumber = parseFloat(filter.model);
      if (!isNaN(filterNumber)) {
        searchFilters['model'] = filterNumber;
      }
    }
    if (filter?.type) {
      searchFilters['type'] = { $regex: new RegExp(filter.type, 'i') };
    }
    if (filter?.plaque) {
      searchFilters['plaque'] = { $regex: new RegExp(filter.plaque, 'i') };
    }
    if (filter?.cantidad) {
      const filterNumber = parseFloat(filter.cantidad);
      if (!isNaN(filterNumber)) {
        searchFilters['cantidad'] = filterNumber;
      }
    }
    if (filter?.status) {
      searchFilters['status'] = filter.status;
    }
    if (filter?.userId) {
      const userId = filter.userId ? filter.userId.trim() : '';
      const words = userId ? userId.split(' ') : [];
      const columnsToSearch = ['name', 'lastName', 'ci'];

      const orConditions = words.length > 0
        ? words.flatMap(word => columnsToSearch.map(column => ({
          [column]: { $regex: new RegExp(word, 'i') }
        })))
        : [];
      const datafilter = await this.busModel.find({
        $and: [
          { _id: { $nin: busIdsAssignedToLinea } },
          searchFilters
        ]
      })
        .populate({
          path: 'userId',
          match: orConditions.length ? { $or: orConditions, delete: false } : {},
          model: 'Users',
        })

      const result = datafilter.filter(bus => bus.userId);
      return { result, total: result.length }
    }

    // Combine conditions
    const queryConditions = {
      $and: [
        { _id: { $nin: busIdsAssignedToLinea } },
        searchFilters
      ]
    };

    // Execute the query with optional pagination
    const query = this.busModel.find(queryConditions).populate('userId');
    if (skip !== undefined && limit !== undefined) {
      query.skip(skip).limit(limit);
    }
    const result = await query.exec();

    // Get the total count of matching documents
    const total = await this.busModel.countDocuments(queryConditions).exec();

    return { result, total };
  }

  async desasignedBus(id: string, desasignedBus: AsignedBusDto) {
    const update = await this.lineModel.findOneAndUpdate({ id }, { $pull: { buses: { $in: desasignedBus.buses } } }, { new: true })
    if (update) {
      return update.populate([{ path: 'buses', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedBus(id: string, asignedBus: AsignedBusDto) {
    const update = await this.lineModel.findOneAndUpdate({ id }, { $addToSet: { buses: { $each: asignedBus.buses } } }, { new: true })
    if (update) {
      return update.populate([{ path: 'buses', match: { delete: false } }])
    }
    throw new NotFoundException('linea no encontrado');
  }
  async allRoadNotAsigned(id: string) {
    const linea = await this.lineModel.findOne({ id: id, delete: false })
    if (linea) {
      if (linea.road.length > 0) {
        const roadIds = linea.road.map((id) => {
          return id.toString()
        })
        return await this.roadModel.find({ _id: { $nin: roadIds }, delete: false })
      }
      return await this.roadModel.find({ delete: false })
    }
    throw new NotFoundException('linea no encontrado');
  }
  async asignedBusRuta(id, data:AsignedBusRoadDto){
    const linea = await this.lineModel.findOne({id}).populate('buses')
    if(linea){
      const filterBus = linea.buses.filter(bus=> bus.id === data.busId)
      if(filterBus.length !==0){
        const updateBus = await this.busModel.findOneAndUpdate({id:data.busId},{road:data.road})
        return await this.lineModel.findOne({id}).populate('buses')
      }
      throw new NotFoundException('bus no asignado a la linea')
    }
    throw new NotFoundException('linea no encontrada')
  }
  async desasignedBusRuta(id, data:AsignedBusRoadDto){
    const linea = await this.lineModel.findOne({id}).populate('buses')
    if(linea){
      const filterBus = linea.buses.filter(bus=> bus.id === data.busId)
      if(filterBus.length !==0){
        const updateBus = await this.busModel.findOneAndUpdate({id:data.busId},{road:null})
        return await this.lineModel.findOne({id}).populate('buses')
      }
      throw new NotFoundException('bus no asignado a la linea')
    }
    throw new NotFoundException('linea no encontrada')
  }
}