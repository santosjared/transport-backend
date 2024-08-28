import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import getConfig from 'src/config/environment'
import { LocationsService } from '../locations/locations.service';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from 'src/bus/entities/bus.entity';
import { Model } from 'mongoose';
import { BusDocmunet } from 'src/bus/schema/bus.schema';
import { Linea, LineaDocument } from 'src/linea/schema/linea.schema';

@Injectable()
export class SocketService {
  constructor(private locationsService: LocationsService,
    private userService: UsersService,
    @InjectModel(Bus.name) private readonly busModel: Model<BusDocmunet>,
    @InjectModel(Linea.name) private readonly lineaModel: Model<LineaDocument>
  ) { }
  async logical(message: any, time) {
    try {
      const { latitude, longitude, token } = message
      const decode: any = this.verifayToken(token)
      if (decode) {

        const findLocation = await this.locationsService.findOne(decode._id)
        if (findLocation) {
          if (findLocation.cords.length === 0) {
            const location = {
              cords: [latitude, longitude],
              speed: 0,
              distance: 0,
              userId: decode._id
            };
            await this.locationsService.update(findLocation._id.toString(), location);
          }
          if (findLocation.signal) {
            const location = {
              cords: [latitude, longitude],
              oldcords: findLocation.cords,
              speed: 0,
              distance: 0,
              userId: decode._id
            };
            await this.locationsService.update(findLocation._id.toString(), location);
            await this.locationsService.updateStatus(findLocation.userId, false)
          } else {
            const cordsA = this.convertCords(findLocation.cords)
            const cordsB = { latitude, longitude }
            const distance = this.Distance(cordsA, cordsB)
            const speed = this.speed(distance, time / 3600)

            const location = {
              cords: [latitude, longitude],
              oldcords: findLocation.cords,
              speed: speed,
              distance: distance,
              userId: decode._id
            };
            await this.locationsService.update(findLocation._id.toString(), location);
          }
        }
      }
    } catch {
      return null
    }

  }
  verifayToken(token: string) {
    try {
      const decode = jwt.verify(token, getConfig().token_Secret)
      return decode;
    } catch {
      return null
    }
  }
  private Distance(pointA: { latitude: number; longitude: number }, pointB: { latitude: number; longitude: number }): number {
    const earthRadiusKm = 6371;
    const latA = this.degreesToRadians(pointA.latitude);
    const lngA = this.degreesToRadians(pointA.longitude);

    const latB = this.degreesToRadians(pointB.latitude);
    const lngB = this.degreesToRadians(pointB.longitude);

    const dLat = latB - latA;
    const dLng = lngB - lngA;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latA) * Math.cos(latB) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    return this.round(distance, 4);
  }

  private degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
  private speed(distance: number, time: number): number {
    if (distance === 0) {
      return 0
    }
    return this.round(distance / time, 0)
  }
  private time(distance: number, speed: number): number {
    if (speed === 0) {
      return distance / 14
    }
    return distance / speed
  }
  private round(decimal: number, length: number): number {
    const x = decimal.toFixed(length)
    return parseFloat(x)
  }
  private convertCords(coordenadas) {
    const [latitude, longitude] = coordenadas;
    return { latitude, longitude };
  }
  async updateStatusUser(id: string, status: string) {
    await this.userService.updateStatus(id, status)
  }
  async create(decode: any) {
    const bus = await this.busModel.findOne({ userId: decode._id })
    if (bus) {
      const findLocation = await this.locationsService.findOne(decode._id)
      if (findLocation) {
        return 
      }
      const data = {
        cords: [],
        speed: 0,
        distance: 0,
        userId: decode._id
      }
      const location = await this.locationsService.create(data)
      await this.busModel.findOneAndUpdate({ userId: decode._id }, { locationId: location._id }, { new: true })
      return 
    }
  }
  async removeLoaction (id:any){
    await this.busModel.findOneAndUpdate({ userId: id }, { locationId: null }, { new: true })
    this.locationsService.remove(id)
  }
  async nearBus(data: any) {

    const { location, busesOld } = data

    const buses = await this.busModel.find({
      locationId: { $ne: null },
      userId: { $ne: null }
    })
      .populate([{
        path: 'userId',
        model: 'Users',
      },
      {path:'trademark', model:'BusMarker'}
    ]).populate('locationId').populate('road');
    const filteredBuses = buses.filter(bus => bus.userId !== null && bus.locationId?.cords.length !== 0);
    if (filteredBuses.length === 0) {
      return { message: 'NINGUN BUS EN OPERACION' };
    }

    const lineas = await this.lineaModel.find({ delete: false }).populate('buses');
    const lineaMap: { [key: string]: Linea } = {};

    lineas.forEach(linea => {
      linea.buses.forEach(buses => {
        lineaMap[buses.id] = linea;
      });
    });


    const busNear = filteredBuses.map(bus => {
      const linea = lineaMap[bus.id];
      if (linea) {
        const distance = this.Distance(location, this.convertCords(bus.locationId.cords))
        const time = this.timeAproxime(distance, bus.locationId.speed)
        return {
          id: bus.id,
          trademark: bus.trademark,
          plaque: bus.plaque,
          photo: bus.photo,
          userId: bus.userId,
          locationId: bus.locationId,
          road: bus.road,
          distanceUser: distance,
          linea: linea.name,
          status:'verificando estado...',
          time:time
        }

      }
      return null
    }).filter(bus => bus !== null);

    busNear.sort((a, b) => a.distanceUser - b.distanceUser)
    const treeBus = busNear.slice(0, 3)
    if (busesOld.length !== 0) {

      const handleStatus = treeBus.map((bus) => {
        let status = 'esperere'
        busesOld.map((oldBus) => {
          if (oldBus.id === bus.id) {
            if(bus.distanceUser<oldBus.distanceUser){
              status = 'Acercandose'
            } else {
              status = 'Alejandose'
            }
          }
        })
        return {
          id: bus.id,
          trademark: bus.trademark,
          plaque: bus.plaque,
          photo: bus.photo,
          userId: bus.userId,
          locationId: bus.locationId,
          road: bus.road,
          distanceUser: bus.distanceUser,
          linea: bus.linea,
          time: bus.time,
          status: status
        }
      })
      return { buses: handleStatus }
    }
    return { buses: treeBus }
  }
  private timeAproxime(distance: number, speed: number): string {
    const time = this.round(this.time(distance, speed) * 60, 0)
    let timeF = time + ' minutos'
    if (time > 60) {
      const hrs = this.round(time / 60, 0)
      timeF = hrs + ' horas'
      if (hrs > 24) {
        const day = this.round(hrs / 24, 0)
        timeF = day + ' días'
      }

    }
    return timeF
  }
}
