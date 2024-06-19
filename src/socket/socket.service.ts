import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import getConfig from 'src/config/environment'
import { LocationsService } from '../locations/locations.service';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from 'src/bus/entities/bus.entity';
import { Model } from 'mongoose';
import { BusDocmunet } from 'src/bus/schema/bus.schema';

@Injectable()
export class SocketService {
  constructor(private locationsService: LocationsService,
    private userService:UsersService,
    @InjectModel(Bus.name) private readonly busModel:Model<BusDocmunet>
  ) { }
  async logical(message: any, time) {
    try {
      const { latitude, longitude, token } = message
      const decode: any = this.verifayToken(token)
      if (decode) {
        const findLocation = await this.locationsService.findOne(decode.id)
        if (findLocation) {
          if(findLocation.cords.length === 0){
            const location = {
              cords: [latitude, longitude],
              speed: 0,
              distance: 0,
              userId: decode.id
            };
            await this.locationsService.update(findLocation.id, location);
          }
          if (findLocation.signal) {
            const location = {
              cords: [latitude, longitude],
              speed: 0,
              distance: 0,
              userId: decode.id
            };
            await this.locationsService.update(findLocation.id, location);
            await this.locationsService.updateStatus(findLocation.userId,false)
          } else {
            const cordsA = this.convertCords(findLocation.cords)
            const cordsB = { latitude, longitude }
            const distance = this.Distance(cordsA, cordsB)
            const speed = this.speed(distance, time / 3600)

            const location = {
              cords: [latitude, longitude],
              speed: speed,
              distance: distance,
              userId: decode.id
            };
            await this.locationsService.update(findLocation.id, location);
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
  async updateStatusUser(id:string,status:string){
  await this.userService.updateStatus(id,status)
  }
  async create(decode:any){
    const bus = await this.busModel.find({userId:decode._id})
    if(bus){
      const findLocation = await this.locationsService.findOne(decode.id)
      if(findLocation){
        return findLocation
      }
      const data = {
        cords:[],
        speed:0,
        distance:0,
        userId:decode.id
      }
      const location = await this.locationsService.create(data)
      await this.busModel.findOneAndUpdate({userId:decode._id}, {locationId:location._id}, {new:true})
      return location
    }
  }
}
