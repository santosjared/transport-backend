import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from './entities/bus.entity';
import { Model } from 'mongoose';
import { BusDocmunet } from './schema/bus.schema';
import { AsigneDriverDto } from './dto/asigne-driver.dto';
import * as fs from 'fs';
import { Users, UsersDocument } from 'src/users/schema/users.schema';

@Injectable()
export class BusService {
  constructor(@InjectModel(Bus.name) private readonly busModel: Model<BusDocmunet>,
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>
  ) { }
  async create(createBusDto: CreateBusDto, files: { photo?: Express.Multer.File[], ruat?: Express.Multer.File[] }) {
    const errorMessages = await this.isValidData(createBusDto)
    if (!errorMessages) {
      createBusDto.ruat=null
      if (files) {
        const { photo, ruat } = files;
        if (photo && ruat) {
          if (photo && ruat.length > 0) {
            const busPhoto = photo[0];
            const frontImagePath = `./uploads/${busPhoto.originalname}`;
            await fs.promises.rename(busPhoto.path, frontImagePath);
            createBusDto.photo = `/uploads/${busPhoto.originalname}`;
          }
        } else {
          if (photo) {
            const busPhoto = photo[0];
            const frontImagePath = `./uploads/${busPhoto.originalname}`;
            await fs.promises.rename(busPhoto.path, frontImagePath);
            createBusDto.photo = `/uploads/${busPhoto.originalname}`;
          }
        }
        if (ruat && ruat.length > 0) {
          const ruatPdf = ruat[0]
          const frontImagePath = `./uploads/${ruatPdf.originalname}`;
          await fs.promises.rename(ruatPdf.path, frontImagePath);
          createBusDto.ruat = `/uploads/${ruatPdf.originalname}`;
        }
      }
      return await this.busModel.create(createBusDto)
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async findAll(filters: any) {

    if (filters) {
      const { filter, skip, limit } = filters
      const searchFilters = { delete: false }
      if (filter) {
        if (filter.trademark) {
          searchFilters['trademark'] = { $regex: new RegExp(filter.trademark, 'i') };
        }
        if (filter.model) {
          const filterNumber = parseFloat(filter.model);
          const isFilterNumber = !isNaN(filterNumber);
          if (isFilterNumber) {
            searchFilters['model'] = filterNumber
          }
        }
        if (filter.type) {
          searchFilters['type'] = { $regex: new RegExp(filter.type, 'i') };
        }
        if (filter.plaque) {
          searchFilters['plaque'] = { $regex: new RegExp(filter.plaque, 'i') };
        }
        if (filter.cantidad) {
          const filterNumber = parseFloat(filter.cantidad);
          const isFilterNumber = !isNaN(filterNumber);
          if (isFilterNumber) {
            searchFilters['cantidad'] = filterNumber
          }
        }
        if (filter.status) {
          searchFilters['status'] = filter.status
        }
        if (filter.ruat) {
          if(filter.ruat === 'notdocument'){
            searchFilters['ruat'] = { $eq: null };
          }else{
            searchFilters['ruat'] = { $ne: null }
          }
        }
        if (filter.userId) {
          const userId = filter.userId ? filter.userId.trim() : '';
          const words = userId ? userId.split(' ') : [];
          const columnsToSearch = ['name', 'lastName', 'ci'];

          const orConditions = words.length > 0
            ? words.flatMap(word => columnsToSearch.map(column => ({
              [column]: { $regex: new RegExp(word, 'i') }
            })))
            : [];
          const datafilter = await this.busModel.find({delete:false})
            .populate({
              path: 'userId',
              match: orConditions.length ? { $or: orConditions, delete:false } : {},
              model: 'Users',
              populate: { path: 'licenceId', model: 'LicenceDriver' }
            })
            .populate('locationId')

            const result = datafilter.filter(bus => bus.userId);
            return {result, total:result.length}
        }
      }

      if (skip !== undefined && limit !== undefined) {
        const result = await this.busModel.find(searchFilters)
          .populate({
            path: 'userId',
            model: 'Users',
            populate: { path: 'licenceId', model: 'LicenceDriver' }
          })
          .populate('locationId')
          .skip(skip)
          .limit(limit)
          .exec();
        const total = await this.busModel.countDocuments(searchFilters);
        return { result, total };
      }

      const result = await this.busModel.find(searchFilters)
        .populate({ path: 'userId', model: 'Users', populate: { path: 'licenceId', model: 'LicenceDriver' } })
        .populate('locationId').exec();
      const total = await this.busModel.countDocuments(searchFilters)
      return { result, total }
    }
    const result = await this.busModel.find({ delete: false })
      .populate({ path: 'userId', model: 'Users', populate: { path: 'licenceId', model: 'LicenceDriver' } })
      .populate('locationId').exec();
    const total = await this.busModel.countDocuments({ delete: false })
    return { result, total }
  }

  async findOne(id: string) {
    return await this.busModel.findOne({ id, delete: false }).populate('userId').populate('locationId')
  }

  async update(id: string, updateBusDto: UpdateBusDto, files: { photo?: Express.Multer.File[], ruat?: Express.Multer.File[] }) {
    const errorMessages = await this.isValidData(updateBusDto, true)
    if (!errorMessages) {
      if (files) {
        const { photo, ruat } = files;
        if (photo && ruat) {
          if (photo && ruat.length > 0) {
            const busPhoto = photo[0];
            const frontImagePath = `./uploads/${busPhoto.originalname}`;
            await fs.promises.rename(busPhoto.path, frontImagePath);
            updateBusDto.photo = `/uploads/${busPhoto.originalname}`;
          }
        } else {
          if (photo) {
            const busPhoto = photo[0];
            const frontImagePath = `./uploads/${busPhoto.originalname}`;
            await fs.promises.rename(busPhoto.path, frontImagePath);
            updateBusDto.photo = `/uploads/${busPhoto.originalname}`;
          }
        }
        if (ruat && ruat.length > 0) {
          const ruatPdf = ruat[0]
          const frontImagePath = `./uploads/${ruatPdf.originalname}`;
          await fs.promises.rename(ruatPdf.path, frontImagePath);
          updateBusDto.ruat = `/uploads/${ruatPdf.originalname}`;
        }
      }
      return await this.busModel.findOneAndUpdate({ id }, updateBusDto)
    }
    throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    return this.busModel.findOneAndUpdate({ id }, { delete: true }, { new: true })
  }
  async getUsers() {
    return this.busModel.aggregate([{
      $lookup: {
        from: 'buses',
        localField: '_id',
        foreignField: 'users',
        as: 'assignedBuses'
      }
    }, {
      $match: {
        assignedBuses: { $size: 0 }
      }
    }]).exec()
  }
  async asigneDriver(id: string, asigneDriverDto: AsigneDriverDto) {
    const { userId } = asigneDriverDto
    const response = await this.busModel.findOneAndUpdate({ id }, { userId }, { new: true })
    if (response) {
      return response
    }
    throw new HttpException('', HttpStatus.BAD_REQUEST);
  }
  async desasigned(id: string) {
    const updatedBus = await this.busModel.findOneAndUpdate(
      { id },
      { userId: null },
      { new: true }
    );

    if (updatedBus) {
      return updatedBus;
    } else {
      throw new NotFoundException('Autobús no encontrado');
    }
  }

  async isValidData(createBusDto: CreateBusDto | UpdateBusDto, update?: boolean) {
    const message = {
      trademark: '',
      model: '',
      type: '',
      plaque: '',
      cantidad: '',
      photo: '',
      ruat: '',
      status: ''
    }
    let isError = false
    if (!createBusDto.cantidad) {
      isError = true;
      message.cantidad = 'el campo catidad es requerido '
    }
    if (createBusDto.cantidad && isNaN(createBusDto.cantidad)) {
      isError = true;
      message.cantidad = 'el campo cantidad debe ser numérico'
    }
    if (createBusDto.cantidad && createBusDto.cantidad < 6) {
      isError = true;
      message.cantidad = 'Cantidad de asientos mínima debe ser 6'
    }
    if (createBusDto.cantidad && createBusDto.cantidad > 46) {
      isError = true;
      message.cantidad = 'cantidad de asientos máxima debe ser a 46'
    }
    if (!createBusDto.model) {
      isError = true;
      message.model = 'el campo model es requerido'
    }
    if (createBusDto.model && isNaN(createBusDto.model)) {
      isError = true;
      message.model = 'el campo modelo debe ser numérico'
    }
    if (createBusDto.model && createBusDto.model < 1980) {
      isError = true;
      message.model = 'El año de modelo aceptada desde 1980'
    }
    const date = new Date()
    const currentYear = date.getFullYear()
    if (createBusDto.model && createBusDto.model > currentYear) {
      isError = true
      message.model = `El año de modelo debe ser menor o igual a ${currentYear} `
    }
    if (!createBusDto.trademark) {
      isError = true;
      message.trademark = 'el campo marca es requerido'
    }
    if (!createBusDto.type) {
      isError = true;
      message.type = 'el campo tipo es requerido'
    }
    if (!createBusDto.plaque) {
      isError = true;
      message.plaque = 'el campo placa es requerido'
    }
    if (!update) {
      if (await this.busModel.findOne({ plaque: createBusDto.plaque })) {
        isError = true;
        message.plaque = 'la placa ya se encuentra registrado'
      }
    }
    if (!createBusDto.status) {
      isError = true;
      message.plaque = 'el campo Estado de Vehículo es requerido'
    }
    if (isError) {
      return message
    }
    return null
  }
}
